'use client';

import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, Plus, Trash2, Calendar, MapPin, Camera,
  Save, Settings, Home, List, Menu, AlertCircle,
  Building2, FileText, ChevronDown, Download, X
} from 'lucide-react';

interface Question {
  id: string;
  text: string;
  points: number;
  required: boolean;
}

interface Section {
  id: string;
  title: string;
  subtitle: string;
  questions: Question[];
}

interface ChecklistState {
  location: string;
  date: string;
  answers: Record<string, string>;
  observations: Record<string, string>;
  photos: Record<string, string[]>;
}

interface SavedChecklist {
  id: number;
  template: string;
  location: string;
  date: string;
  answers: Record<string, string>;
  observations: Record<string, string>;
  score: {
    total: number;
    achieved: number;
    percentage: number;
  };
  createdAt: string;
}

interface Template {
  id: number;
  name: string;
  description: string;
  sections: Section[];
}

const CheckFlowPro = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [locations, setLocations] = useState<string[]>([]);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  const [savedChecklists, setSavedChecklists] = useState<SavedChecklist[]>([]);
  const [selectedChecklistForDetails, setSelectedChecklistForDetails] = useState<SavedChecklist | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const [currentChecklist, setCurrentChecklist] = useState<ChecklistState>({
    location: '',
    date: '',
    answers: {},
    observations: {},
    photos: {}
  });

  const [templates] = useState<Template[]>([
    {
      id: 1,
      name: 'Área Externa / Entrada',
      description: 'Conservação e Limpeza',
      sections: [
        {
          id: 's1',
          title: 'ÁREA EXTERNA / ENTRADA',
          subtitle: 'Conservação e Limpeza',
          questions: [
            { id: 'q1', text: 'Fachada limpa e conservada?', points: 1, required: true },
            { id: 'q2', text: 'Placa/Logomarca visível e em bom estado?', points: 1, required: true },
            { id: 'q3', text: 'Portas e vidros limpos?', points: 1, required: true },
            { id: 'q4', text: 'Tapes limpos e bem conservados?', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Recepção / Salão / Caixa',
      description: 'Estrutura, equipamentos e higiene',
      sections: [
        {
          id: 's2',
          title: 'RECEPÇÃO / SALÃO / CAIXA',
          subtitle: 'Estrutura, equipamentos e higiene',
          questions: [
            { id: 'q5', text: 'Limpeza e organização', points: 1, required: true },
            { id: 'q6', text: 'Piso, Teto, Parede limpos e organizados?', points: 1, required: true },
            { id: 'q7', text: 'Equipamentos funcionando/ parados', points: 1, required: true },
            { id: 'q8', text: 'Utensílios', points: 1, required: true },
            { id: 'q9', text: 'Iluminação', points: 1, required: true },
            { id: 'q10', text: 'Temperatura', points: 1, required: true },
            { id: 'q11', text: 'Pragas e insetos', points: 1, required: true },
            { id: 'q12', text: 'WIFI', points: 1, required: true },
            { id: 'q13', text: 'Pega mosca', points: 1, required: true },
            { id: 'q14', text: 'Parquinho', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 3,
      name: 'Buffet',
      description: 'Qualidade, variedade, higiene, padrões',
      sections: [
        {
          id: 's3',
          title: 'BUFFET',
          subtitle: 'Qualidade, variedade, higiene, padrões',
          questions: [
            { id: 'q15', text: 'Qualidade', points: 1, required: true },
            { id: 'q16', text: 'Variedade', points: 1, required: true },
            { id: 'q17', text: 'Higiene', points: 1, required: true },
            { id: 'q18', text: 'Pratos quentes', points: 1, required: true },
            { id: 'q19', text: 'Sushi', points: 1, required: true },
            { id: 'q20', text: 'Sobremesa', points: 1, required: true },
            { id: 'q21', text: 'Pratos e utensílios', points: 1, required: true },
            { id: 'q22', text: 'Aferição de temperatura', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 4,
      name: 'Banheiros',
      description: 'Limpeza, temperatura, materiais',
      sections: [
        {
          id: 's4',
          title: 'BANHEIROS',
          subtitle: 'Limpeza, temperatura, materiais',
          questions: [
            { id: 'q23', text: 'Higiene', points: 1, required: true },
            { id: 'q24', text: 'Estrutura', points: 1, required: true },
            { id: 'q25', text: 'Kit de higiene', points: 1, required: true },
            { id: 'q26', text: 'Temperatura', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 5,
      name: 'Cozinha',
      description: 'Higiene, limpeza, saneamento, equipamentos',
      sections: [
        {
          id: 's5',
          title: 'COZINHA',
          subtitle: 'Higiene, limpeza, saneamento, equipamentos',
          questions: [
            { id: 'q27', text: 'Higiene e limpeza', points: 1, required: true },
            { id: 'q28', text: 'Saneamento', points: 1, required: true },
            { id: 'q29', text: 'Equipamentos de cozinha', points: 1, required: true },
            { id: 'q30', text: 'Estrutura', points: 1, required: true },
            { id: 'q31', text: 'Controle de desperdícios', points: 1, required: true },
            { id: 'q32', text: 'Controle e filtragem de óleo', points: 1, required: false }
          ]
        }
      ]
    },
    {
      id: 6,
      name: 'Câmaras Frias',
      description: 'Organização, higiene, temperatura',
      sections: [
        {
          id: 's6',
          title: 'CÂMARAS FRIAS',
          subtitle: 'Organização, higiene, temperatura, limpeza, palete',
          questions: [
            { id: 'q33', text: 'Limpeza e higiene', points: 1, required: true },
            { id: 'q34', text: 'Temperatura', points: 1, required: true },
            { id: 'q35', text: 'Paletes', points: 1, required: true },
            { id: 'q36', text: 'Etiquetagem de validade', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 7,
      name: 'Churrasqueira e Espeto',
      description: 'Carne, higiene, limpeza',
      sections: [
        {
          id: 's7',
          title: 'CHURRASQUEIRA E ESPETO',
          subtitle: 'Carne, montagem do espeto, higiene, limpeza, armazenamento',
          questions: [
            { id: 'q37', text: 'Qualidade da carne', points: 1, required: true },
            { id: 'q38', text: 'Carne no espeto', points: 1, required: true },
            { id: 'q39', text: 'Limpeza', points: 1, required: true },
            { id: 'q40', text: 'Motor da churrasqueira', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 8,
      name: 'Estoque',
      description: 'Higiene, organização, lançamentos',
      sections: [
        {
          id: 's8',
          title: 'ESTOQUE',
          subtitle: 'Higiene, organização, lançamentos',
          questions: [
            { id: 'q41', text: 'Organização e Higiene', points: 1, required: true },
            { id: 'q42', text: 'Controle de estoque', points: 1, required: true },
            { id: 'q43', text: 'Recebimento e balança', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 9,
      name: 'Retaguarda e Funcionários',
      description: 'Higiene pessoal, apresentação',
      sections: [
        {
          id: 's9',
          title: 'RETAGUARDA E FUNCIONÁRIOS',
          subtitle: 'Higiene pessoal, banheiros, apresentação, eficiência no salão',
          questions: [
            { id: 'q44', text: 'Higiene pessoal', points: 1, required: true },
            { id: 'q45', text: 'Fardamento', points: 1, required: true },
            { id: 'q46', text: 'Eficiência no salão', points: 1, required: true },
            { id: 'q47', text: 'Banheiros funcionários', points: 1, required: true }
          ]
        }
      ]
    },
    {
      id: 10,
      name: 'Depósito',
      description: 'Observações gerais',
      sections: [
        {
          id: 's10',
          title: 'DEPÓSITO',
          subtitle: '',
          questions: []
        }
      ]
    },
    {
      id: 11,
      name: 'Escritório',
      description: 'Observações gerais',
      sections: [
        {
          id: 's11',
          title: 'ESCRITÓRIO',
          subtitle: '',
          questions: []
        }
      ]
    },
    {
      id: 12,
      name: 'Documentações',
      description: 'Documentos atualizados',
      sections: [
        {
          id: 's12',
          title: 'DOCUMENTAÇÕES',
          subtitle: 'Documentos atualizados',
          questions: [
            { id: 'q48', text: 'Alvará de funcionamento', points: 5, required: true },
            { id: 'q49', text: 'Alvará de saúde da Vigilância Sanitária', points: 5, required: true },
            { id: 'q50', text: 'Alvará Corpo de Bombeiros', points: 5, required: true },
            { id: 'q51', text: 'Seguro da Casa', points: 5, required: true },
            { id: 'q52', text: 'Documentos SST - Saúde e Segurança do Trabalhador', points: 5, required: true },
            { id: 'q53', text: 'Exames admissionais, periódicos e demissionais dos funcionários', points: 2, required: true },
            { id: 'q54', text: 'Contrato com Nutricionista acompanhando a casa', points: 5, required: true }
          ]
        }
      ]
    }
  ]);

  // Carregar dados do localStorage
  useEffect(() => {
    try {
      const savedLocations = localStorage.getItem('checkflow_locations');
      if (savedLocations) {
        setLocations(JSON.parse(savedLocations));
      } else {
        const defaultLocations = [
          'BB - Abreu e Lima',
          'BB - Campina Grande',
          'BB - Candeias',
          'BB - Caruaru',
          'BB - Caxangá',
          'BB - Espinheiro',
          'BB - Feira de Santana',
          'BB - Gravatá',
          'BB - Ilha do Retiro',
          'BB - João Pessoa',
          'BB - Juazeiro',
          'BB - Olinda',
          'BB - Prazeres',
          'Rancho - Olinda',
          'Panela Cheia - Caruaru'
        ];
        setLocations(defaultLocations);
        localStorage.setItem('checkflow_locations', JSON.stringify(defaultLocations));
      }

      const savedChecklistsData = localStorage.getItem('checkflow_checklists');
      if (savedChecklistsData) {
        setSavedChecklists(JSON.parse(savedChecklistsData));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  }, []);

  // Salvar locais
  useEffect(() => {
    if (locations.length > 0) {
      try {
        localStorage.setItem('checkflow_locations', JSON.stringify(locations));
      } catch (error) {
        console.error('Erro ao salvar locais:', error);
      }
    }
  }, [locations]);

  // Salvar checklists
  useEffect(() => {
    if (savedChecklists.length > 0) {
      try {
        localStorage.setItem('checkflow_checklists', JSON.stringify(savedChecklists));
      } catch (error) {
        console.error('Erro ao salvar checklists:', error);
      }
    }
  }, [savedChecklists]);

  const addLocation = () => {
    if (newLocation.trim()) {
      setLocations([...locations, newLocation.trim()]);
      setNewLocation('');
      setShowAddLocation(false);
    }
  };

  const removeLocation = (location: string) => {
    if (window.confirm(`Tem certeza que deseja excluir "${location}"?`)) {
      setLocations(locations.filter(l => l !== location));
    }
  };

  const saveAnswer = (questionId: string, value: string) => {
    setCurrentChecklist({
      ...currentChecklist,
      answers: { ...currentChecklist.answers, [questionId]: value }
    });
  };

  const saveObservation = (sectionId: string, text: string) => {
    setCurrentChecklist({
      ...currentChecklist,
      observations: { ...currentChecklist.observations, [sectionId]: text }
    });
  };

  const handlePhotoUpload = (sectionId: string, files: FileList | null) => {
    if (files) {
      const fileNames = Array.from(files).map(f => f.name);
      setCurrentChecklist({
        ...currentChecklist,
        photos: {
          ...currentChecklist.photos,
          [sectionId]: fileNames
        }
      });
    }
  };

  const calculateScore = () => {
    if (!selectedTemplate) return { total: 0, achieved: 0, percentage: 0 };

    let totalPoints = 0;
    let achievedPoints = 0;

    selectedTemplate.sections.forEach(section => {
      section.questions.forEach(question => {
        totalPoints += question.points;
        if (currentChecklist.answers[question.id] === 'SIM') {
          achievedPoints += question.points;
        }
      });
    });

    return {
      total: totalPoints,
      achieved: achievedPoints,
      percentage: totalPoints > 0 ? Math.round((achievedPoints / totalPoints) * 100) : 0
    };
  };

  const canSaveChecklist = () => {
    if (!currentChecklist.location || !currentChecklist.date || !selectedTemplate) {
      return false;
    }

    const allRequiredAnswered = selectedTemplate.sections.every(section =>
      section.questions
        .filter(q => q.required)
        .every(q => currentChecklist.answers[q.id] === 'SIM' || currentChecklist.answers[q.id] === 'NÃO')
    );

    return allRequiredAnswered;
  };

  const saveChecklist = () => {
    if (!canSaveChecklist() || !selectedTemplate) {
      alert('Por favor, preencha todos os campos obrigatórios antes de salvar.');
      return;
    }

    const score = calculateScore();
    const checklist: SavedChecklist = {
      id: Date.now(),
      template: selectedTemplate.name,
      location: currentChecklist.location,
      date: currentChecklist.date,
      answers: currentChecklist.answers,
      observations: currentChecklist.observations,
      score: score,
      createdAt: new Date().toISOString()
    };

    setSavedChecklists([checklist, ...savedChecklists]);

    setCurrentChecklist({
      location: '',
      date: '',
      answers: {},
      observations: {},
      photos: {}
    });
    setSelectedTemplate(null);
    setCurrentPage('checklists');

    alert(`Checklist salvo com sucesso!\nPontuação: ${score.percentage}%`);
  };

  const downloadChecklistPDF = (checklist: SavedChecklist) => {
    // Encontra o template correspondente
    const template = templates.find(t => t.name === checklist.template);
    if (!template) return;

    // Cria o conteúdo HTML do relatório
    let htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Checklist - ${checklist.template}</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      padding: 40px;
      color: #333;
    }
    .header {
      text-align: center;
      margin-bottom: 40px;
      border-bottom: 3px solid #dc2626;
      padding-bottom: 20px;
    }
    .header h1 {
      color: #dc2626;
      margin: 0;
      font-size: 32px;
    }
    .header h2 {
      color: #666;
      margin: 10px 0 0 0;
      font-size: 20px;
      font-weight: normal;
    }
    .info-section {
      background: #f9fafb;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 30px;
      border-left: 4px solid #dc2626;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 10px;
    }
    .info-label {
      font-weight: bold;
      color: #dc2626;
    }
    .score-section {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
      color: white;
      padding: 30px;
      border-radius: 12px;
      text-align: center;
      margin-bottom: 30px;
    }
    .score-number {
      font-size: 72px;
      font-weight: bold;
      margin: 20px 0;
    }
    .score-bar {
      background: rgba(255,255,255,0.3);
      height: 20px;
      border-radius: 10px;
      overflow: hidden;
      margin: 20px 0;
    }
    .score-fill {
      height: 100%;
      background: white;
      transition: width 0.3s;
    }
    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    .section-header {
      background: #374151;
      color: white;
      padding: 15px 20px;
      border-radius: 8px 8px 0 0;
      font-size: 18px;
      font-weight: bold;
    }
    .section-subtitle {
      font-size: 14px;
      opacity: 0.9;
      font-style: italic;
      margin-top: 5px;
    }
    .section-content {
      border: 1px solid #e5e7eb;
      border-top: none;
      padding: 20px;
      border-radius: 0 0 8px 8px;
    }
    .question {
      padding: 15px;
      margin-bottom: 15px;
      background: #f9fafb;
      border-radius: 8px;
      border-left: 4px solid #d1d5db;
    }
    .question.answered-yes {
      border-left-color: #10b981;
      background: #ecfdf5;
    }
    .question.answered-no {
      border-left-color: #ef4444;
      background: #fef2f2;
    }
    .question-text {
      font-weight: 600;
      margin-bottom: 8px;
      color: #1f2937;
    }
    .question-answer {
      display: inline-block;
      padding: 6px 16px;
      border-radius: 20px;
      font-weight: bold;
      font-size: 14px;
    }
    .answer-yes {
      background: #10b981;
      color: white;
    }
    .answer-no {
      background: #ef4444;
      color: white;
    }
    .answer-pending {
      background: #d1d5db;
      color: #6b7280;
    }
    .question-points {
      float: right;
      background: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: bold;
      color: #dc2626;
      border: 1px solid #fecaca;
    }
    .observation {
      margin-top: 20px;
      padding: 15px;
      background: #fffbeb;
      border-radius: 8px;
      border-left: 4px solid #f59e0b;
    }
    .observation-title {
      font-weight: bold;
      color: #92400e;
      margin-bottom: 8px;
    }
    .observation-text {
      color: #78350f;
      line-height: 1.6;
    }
    .footer {
      margin-top: 50px;
      text-align: center;
      color: #6b7280;
      font-size: 12px;
      padding-top: 20px;
      border-top: 1px solid #e5e7eb;
    }
    @media print {
      body { padding: 20px; }
      .section { page-break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>CheckFlow Pro</h1>
    <h2>Relatório de Inspeção</h2>
  </div>

  <div class="info-section">
    <div class="info-row">
      <span class="info-label">Template:</span>
      <span>${checklist.template}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Unidade:</span>
      <span>${checklist.location}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Data da Visita:</span>
      <span>${new Date(checklist.date).toLocaleDateString('pt-BR')}</span>
    </div>
    <div class="info-row">
      <span class="info-label">Data de Criação:</span>
      <span>${new Date(checklist.createdAt).toLocaleDateString('pt-BR')} às ${new Date(checklist.createdAt).toLocaleTimeString('pt-BR')}</span>
    </div>
  </div>

  <div class="score-section">
    <div style="font-size: 20px;">Pontuação Total</div>
    <div class="score-number">${checklist.score.percentage}%</div>
    <div class="score-bar">
      <div class="score-fill" style="width: ${checklist.score.percentage}%"></div>
    </div>
    <div style="font-size: 16px;">${checklist.score.achieved} de ${checklist.score.total} pontos</div>
    <div style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
      ${checklist.score.percentage >= 80 ? '✓ Excelente Conformidade' : 
        checklist.score.percentage >= 50 ? '⚠ Atenção Necessária' : 
        '✗ Situação Crítica'}
    </div>
  </div>
`;

    // Adiciona as seções com perguntas
    template.sections.forEach(section => {
      htmlContent += `
  <div class="section">
    <div class="section-header">
      ${section.title}
      ${section.subtitle ? `<div class="section-subtitle">${section.subtitle}</div>` : ''}
    </div>
    <div class="section-content">
`;

      if (section.questions.length > 0) {
        section.questions.forEach(question => {
          const answer = checklist.answers[question.id] || 'Não respondida';
          const answerClass = answer === 'SIM' ? 'answered-yes' : answer === 'NÃO' ? 'answered-no' : '';
          const answerBadgeClass = answer === 'SIM' ? 'answer-yes' : answer === 'NÃO' ? 'answer-no' : 'answer-pending';

          htmlContent += `
      <div class="question ${answerClass}">
        <div class="question-text">
          ${question.text}
          <span class="question-points">${question.points} ${question.points === 1 ? 'ponto' : 'pontos'}</span>
        </div>
        <span class="question-answer ${answerBadgeClass}">${answer}</span>
      </div>
`;
        });
      }

      // Adiciona observações se existirem
      if (checklist.observations[section.id]) {
        htmlContent += `
      <div class="observation">
        <div class="observation-title">📝 Observações:</div>
        <div class="observation-text">${checklist.observations[section.id]}</div>
      </div>
`;
      }

      htmlContent += `
    </div>
  </div>
`;
    });

    htmlContent += `
  <div class="footer">
    <p><strong>CheckFlow Pro</strong> - Sistema Profissional de Gestão de Checklists Operacionais</p>
    <p>Relatório gerado em ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}</p>
  </div>
</body>
</html>
`;

    // Cria um blob e faz o download
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Checklist_${checklist.template.replace(/\s+/g, '_')}_${checklist.location.replace(/\s+/g, '_')}_${new Date(checklist.date).toLocaleDateString('pt-BR').replace(/\//g, '-')}.html`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const renderHome = () => {
    return (
      <div className="space-y-8">
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <img src="/touro.png" alt="CheckFlow Pro" className="h-16 w-16" />
              <h1 className="text-4xl md:text-5xl font-bold">CheckFlow Pro</h1>
            </div>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl">
              Sistema Completo de Gestão de Checklists Operacionais
            </p>
            <button
              onClick={() => setCurrentPage('new-checklist')}
              className="bg-white text-red-600 px-8 py-4 rounded-xl font-semibold hover:bg-opacity-90 transition-all inline-flex items-center gap-2 shadow-lg text-lg"
            >
              <Plus size={24} /> Novo Checklist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
              <FileText size={28} className="text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-900 mb-1">{savedChecklists.length}</div>
            <div className="text-sm text-red-600">Checklists Realizados</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
              <Building2 size={28} className="text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-900 mb-1">{locations.length}</div>
            <div className="text-sm text-red-600">Locais Cadastrados</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
              <List size={28} className="text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-900 mb-1">{templates.length}</div>
            <div className="text-sm text-red-600">Templates Disponíveis</div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-all">
            <div className="p-2 bg-red-100 rounded-lg w-fit mb-3">
              <CheckCircle2 size={28} className="text-red-600" />
            </div>
            <div className="text-4xl font-bold text-red-900 mb-1">
              {savedChecklists.length > 0
                ? Math.round(savedChecklists.reduce((acc, c) => acc + c.score.percentage, 0) / savedChecklists.length)
                : 0}%
            </div>
            <div className="text-sm text-red-600">Média de Conformidade</div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-red-900 mb-6">Templates Disponíveis</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((tmpl) => {
              const totalQuestions = tmpl.sections.reduce((acc, s) => acc + s.questions.length, 0);
              const totalPoints = tmpl.sections.reduce((acc, s) =>
                acc + s.questions.reduce((sum, q) => sum + q.points, 0), 0
              );

              return (
                <div
                  key={tmpl.id}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all cursor-pointer group"
                  onClick={() => {
                    setSelectedTemplate(tmpl);
                    setCurrentPage('new-checklist');
                  }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <FileText size={32} className="text-indigo-600" />
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-semibold text-indigo-600">
                      {totalPoints} pts
                    </span>
                  </div>
                  <h3 className="font-bold text-red-900 mb-2 text-lg group-hover:text-red-600 transition-colors">
                    {tmpl.name}
                  </h3>
                  <p className="text-sm text-red-600 mb-4">{tmpl.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-indigo-100">
                    <span className="text-xs text-red-500">
                      {totalQuestions} perguntas
                    </span>
                    <ChevronDown size={18} className="text-red-400 rotate-[-90deg]" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderNewChecklist = () => {
    if (!selectedTemplate) {
      return (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center">
          <FileText size={64} className="text-red-300 mx-auto mb-4" />
          <h2 className="text-3xl font-bold text-red-900 mb-3">Selecione um Template</h2>
          <p className="text-red-600 mb-8 text-lg">Escolha um template para iniciar a inspeção</p>
          <button
            onClick={() => setCurrentPage('home')}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Ver Templates Disponíveis
          </button>
        </div>
      );
    }

    const score = calculateScore();
    const canSave = canSaveChecklist();

    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-40">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{selectedTemplate.name}</h1>
          <p className="text-white/90 text-lg">{selectedTemplate.description}</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-red-200">
          <div className="flex items-center gap-3 text-red-600 mb-6">
            <AlertCircle size={24} />
            <span className="font-bold text-lg">Informações Obrigatórias</span>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-red-900 mb-2">
                UNIDADE <span className="text-red-600">*</span>
              </label>
              <select
                value={currentChecklist.location}
                onChange={(e) => setCurrentChecklist({...currentChecklist, location: e.target.value})}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base bg-white appearance-none cursor-pointer"
                style={{ backgroundColor: 'white' }}
              >
                <option value="">Escolher</option>
                {locations.map((loc) => (
                  <option key={loc} value={loc}>{loc}</option>
                ))}
              </select>
              {!currentChecklist.location && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>Esta pergunta é obrigatória</span>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-bold text-red-900 mb-2">
                DATA DA VISITA <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                value={currentChecklist.date}
                onChange={(e) => setCurrentChecklist({...currentChecklist, date: e.target.value})}
                className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
              />
              {!currentChecklist.date && (
                <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                  <AlertCircle size={16} />
                  <span>Esta pergunta é obrigatória</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {selectedTemplate.sections.map((section) => (
          <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-700 text-white px-6 py-4">
              <h2 className="text-xl font-bold">{section.title}</h2>
              {section.subtitle && (
                <p className="text-white/80 text-sm italic mt-1">{section.subtitle}</p>
              )}
            </div>

            <div className="p-6 space-y-6">
              {section.questions.length > 0 ? (
                section.questions.map((question) => (
                  <div
                    key={question.id}
                    className={`p-5 rounded-xl transition-all ${
                      question.required
                        ? 'border-2 border-red-200 bg-red-50/30'
                        : 'border border-gray-200 bg-gray-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <label className="text-red-900 font-semibold flex-1 text-base">
                        {question.text}
                        {question.required && <span className="text-red-600 ml-1">*</span>}
                      </label>
                      <span className="text-sm text-red-500 ml-4 bg-white px-3 py-1 rounded-full font-medium">
                        {question.points} {question.points === 1 ? 'ponto' : 'pontos'}
                      </span>
                    </div>

                    <select
                      value={currentChecklist.answers[question.id] || ''}
                      onChange={(e) => saveAnswer(question.id, e.target.value)}
                      className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base bg-white appearance-none cursor-pointer"
                      style={{ backgroundColor: 'white' }}
                    >
                      <option value="">Escolher</option>
                      <option value="SIM">SIM</option>
                      <option value="NÃO">NÃO</option>
                    </select>

                    {question.required && !currentChecklist.answers[question.id] && (
                      <div className="flex items-center gap-2 mt-3 text-red-600 text-sm font-medium">
                        <AlertCircle size={16} />
                        <span>Esta pergunta é obrigatória</span>
                      </div>
                    )}
                  </div>
                ))
              ) : null}

              <div className="pt-4">
                <label className="block text-red-900 font-semibold mb-3 text-base">
                  Observações gerais
                </label>
                <textarea
                  value={currentChecklist.observations[section.id] || ''}
                  onChange={(e) => saveObservation(section.id, e.target.value)}
                  placeholder="Sua resposta"
                  className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent min-h-[120px] text-base"
                />
              </div>

              <div className="pt-4">
                <label className="block text-red-900 font-semibold mb-3 text-base">
                  <Camera size={20} className="inline mr-2" />
                  Foto
                </label>
                <p className="text-sm text-red-600 mb-4">
                  Faça upload de até 10 arquivos aceitos. O tamanho máximo é de 10 MB por item.
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  id={`photo-${section.id}`}
                  onChange={(e) => handlePhotoUpload(section.id, e.target.files)}
                />
                <button
                  onClick={() => document.getElementById(`photo-${section.id}`)?.click()}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar arquivo
                </button>
                {currentChecklist.photos[section.id] && currentChecklist.photos[section.id].length > 0 && (
                  <div className="mt-3 text-sm text-green-600 font-medium">
                    ✓ {currentChecklist.photos[section.id].length} arquivo(s) selecionado(s)
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        <div className="fixed bottom-0 left-0 right-0 bg-white border-t-4 border-red-200 shadow-2xl z-50">
          <div className="max-w-4xl mx-auto px-4 py-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-red-900">Pontuação Total</h3>
                <p className="text-red-600 text-lg mt-1">
                  {score.achieved} de {score.total} pontos
                </p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  {score.percentage}%
                </div>
                <div className="text-sm text-gray-500 mt-1">Conformidade</div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
              <div
                className={`h-4 rounded-full transition-all duration-300 ${
                  score.percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                  score.percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                  'bg-gradient-to-r from-red-500 to-red-600'
                }`}
                style={{ width: `${score.percentage}%` }}
              ></div>
            </div>

            <div className="flex flex-col md:flex-row gap-3">
              <button
                onClick={() => {
                  if (window.confirm('Deseja cancelar? Todos os dados serão perdidos.')) {
                    setSelectedTemplate(null);
                    setCurrentChecklist({
                      location: '',
                      date: '',
                      answers: {},
                      observations: {},
                      photos: {}
                    });
                    setCurrentPage('home');
                  }
                }}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all"
              >
                Cancelar
              </button>
              <button
                onClick={saveChecklist}
                disabled={!canSave}
                className={`flex-1 px-6 py-3 rounded-xl font-bold transition-all inline-flex items-center justify-center gap-3 ${
                  canSave
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:shadow-xl cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <Save size={24} />
                Salvar Checklist
              </button>
            </div>

            {!canSave && (
              <div className="mt-3 flex items-center gap-3 text-amber-700 bg-amber-50 p-3 rounded-xl border border-amber-200 text-sm">
                <AlertCircle size={20} />
                <span className="font-medium">
                  Preencha todos os campos obrigatórios (marcados com *) antes de salvar
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderChecklists = () => {
    return (
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Checklists Realizados</h2>
            <p className="text-gray-600 mt-1 text-lg">{savedChecklists.length} inspeções registradas</p>
          </div>
          <button
            onClick={() => setCurrentPage('new-checklist')}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
          >
            <Plus size={20} /> Novo Checklist
          </button>
        </div>

        {savedChecklists.length === 0 ? (
          <div className="bg-white rounded-2xl p-16 shadow-sm border border-gray-100 text-center">
            <FileText size={64} className="text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Nenhum checklist realizado</h3>
            <p className="text-gray-600 mb-6">Comece sua primeira inspeção agora</p>
            <button
              onClick={() => setCurrentPage('new-checklist')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} /> Criar Primeiro Checklist
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedChecklists.map((checklist) => (
              <div key={checklist.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-lg">{checklist.template}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-1">
                      <MapPin size={16} />
                      <span>{checklist.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar size={16} />
                      <span>{new Date(checklist.date).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (window.confirm('Deseja realmente excluir este checklist?')) {
                        setSavedChecklists(savedChecklists.filter(c => c.id !== checklist.id));
                      }
                    }}
                    className="text-gray-400 hover:text-red-600 transition-colors p-2"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-600 font-medium">Pontuação</span>
                    <span className={`text-3xl font-bold ${
                      checklist.score.percentage >= 80 ? 'text-green-600' :
                      checklist.score.percentage >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {checklist.score.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div
                      className={`h-3 rounded-full transition-all ${
                        checklist.score.percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                        checklist.score.percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                        'bg-gradient-to-r from-red-500 to-red-600'
                      }`}
                      style={{ width: `${checklist.score.percentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    {checklist.score.achieved} de {checklist.score.total} pontos
                  </p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => {
                      setSelectedChecklistForDetails(checklist);
                      setShowDetailsModal(true);
                    }}
                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm"
                  >
                    Ver Detalhes
                  </button>
                  <button 
                    onClick={() => downloadChecklistPDF(checklist)}
                    className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm"
                  >
                    <Download size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* MODAL DE DETALHES */}
        {showDetailsModal && selectedChecklistForDetails && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowDetailsModal(false)}>
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
              {/* Header do Modal */}
              <div className="sticky top-0 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-t-2xl">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedChecklistForDetails.template}</h2>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{selectedChecklistForDetails.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{new Date(selectedChecklistForDetails.date).toLocaleDateString('pt-BR')}</span>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Score */}
              <div className="p-6 bg-gradient-to-br from-gray-50 to-white border-b">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Pontuação Total</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      {selectedChecklistForDetails.score.achieved} de {selectedChecklistForDetails.score.total} pontos
                    </p>
                  </div>
                  <div className={`text-5xl font-bold ${
                    selectedChecklistForDetails.score.percentage >= 80 ? 'text-green-600' :
                    selectedChecklistForDetails.score.percentage >= 50 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {selectedChecklistForDetails.score.percentage}%
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full transition-all ${
                      selectedChecklistForDetails.score.percentage >= 80 ? 'bg-gradient-to-r from-green-500 to-green-600' :
                      selectedChecklistForDetails.score.percentage >= 50 ? 'bg-gradient-to-r from-yellow-500 to-orange-500' :
                      'bg-gradient-to-r from-red-500 to-red-600'
                    }`}
                    style={{ width: `${selectedChecklistForDetails.score.percentage}%` }}
                  ></div>
                </div>
                <p className="text-center text-sm mt-3 font-medium">
                  {selectedChecklistForDetails.score.percentage >= 80 ? '✓ Excelente Conformidade' : 
                   selectedChecklistForDetails.score.percentage >= 50 ? '⚠ Atenção Necessária' : 
                   '✗ Situação Crítica'}
                </p>
              </div>

              {/* Respostas por Seção */}
              <div className="p-6 space-y-6">
                {templates.find(t => t.name === selectedChecklistForDetails.template)?.sections.map(section => (
                  <div key={section.id} className="border border-gray-200 rounded-xl overflow-hidden">
                    <div className="bg-gray-700 text-white p-4">
                      <h3 className="font-bold text-lg">{section.title}</h3>
                      {section.subtitle && <p className="text-sm text-white/80 mt-1 italic">{section.subtitle}</p>}
                    </div>
                    <div className="p-4 space-y-3">
                      {section.questions.length > 0 ? (
                        section.questions.map(question => {
                          const answer = selectedChecklistForDetails.answers[question.id] || 'Não respondida';
                          return (
                            <div key={question.id} className={`p-4 rounded-lg border-l-4 ${
                              answer === 'SIM' ? 'bg-green-50 border-green-500' :
                              answer === 'NÃO' ? 'bg-red-50 border-red-500' :
                              'bg-gray-50 border-gray-300'
                            }`}>
                              <div className="flex items-start justify-between mb-2">
                                <p className="font-semibold text-gray-900 flex-1">{question.text}</p>
                                <span className="ml-4 text-sm bg-white px-3 py-1 rounded-full font-medium text-gray-700 border">
                                  {question.points} {question.points === 1 ? 'pt' : 'pts'}
                                </span>
                              </div>
                              <span className={`inline-block px-3 py-1 rounded-full text-sm font-bold ${
                                answer === 'SIM' ? 'bg-green-600 text-white' :
                                answer === 'NÃO' ? 'bg-red-600 text-white' :
                                'bg-gray-400 text-white'
                              }`}>
                                {answer}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <p className="text-gray-500 text-sm italic">Nenhuma pergunta nesta seção</p>
                      )}
                      
                      {selectedChecklistForDetails.observations[section.id] && (
                        <div className="mt-4 p-4 bg-amber-50 border-l-4 border-amber-500 rounded-lg">
                          <p className="font-bold text-amber-900 mb-2">📝 Observações:</p>
                          <p className="text-amber-800 text-sm">{selectedChecklistForDetails.observations[section.id]}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer do Modal */}
              <div className="sticky bottom-0 bg-white border-t p-6 rounded-b-2xl flex gap-3">
                <button
                  onClick={() => downloadChecklistPDF(selectedChecklistForDetails)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all inline-flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  Baixar Relatório
                </button>
                <button
                  onClick={() => setShowDetailsModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderSettings = () => {
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Configurações do Sistema</h2>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">Gerenciar Locais</h3>
              <p className="text-gray-600 mt-1">Adicione, edite ou remova locais de inspeção</p>
            </div>
            <button
              onClick={() => setShowAddLocation(true)}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all inline-flex items-center gap-2"
            >
              <Plus size={20} /> Adicionar Local
            </button>
          </div>

          {showAddLocation && (
            <div className="mb-6 p-5 bg-purple-50 rounded-xl border-2 border-purple-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">Novo Local</label>
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addLocation()}
                  placeholder="Ex: BB - Recife Centro"
                  className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  autoFocus
                />
                <button
                  onClick={addLocation}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Salvar
                </button>
                <button
                  onClick={() => {
                    setShowAddLocation(false);
                    setNewLocation('');
                  }}
                  className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2 max-h-96 overflow-y-auto">
            {locations.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Building2 size={48} className="mx-auto mb-3 opacity-50" />
                <p>Nenhum local cadastrado ainda</p>
              </div>
            ) : (
              locations.map((location, index) => (
                <div key={`${location}-${index}`} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </span>
                    <Building2 size={20} className="text-gray-600" />
                    <span className="text-gray-900 font-medium">{location}</span>
                  </div>
                  <button
                    onClick={() => removeLocation(location)}
                    className="text-gray-400 hover:text-red-600 transition-colors p-2 opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start gap-3">
              <AlertCircle size={20} className="text-blue-600 mt-0.5" />
              <div className="text-sm text-blue-800">
                <p className="font-semibold mb-1">Dica:</p>
                <p>Organize seus locais de forma consistente. Ex: &quot;Nome da Rede - Cidade&quot; para facilitar buscas e filtros futuros.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Estatísticas do Sistema</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl">
              <div className="text-sm text-blue-700 mb-1">Total de Templates</div>
              <div className="text-3xl font-bold text-blue-900">{templates.length}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
              <div className="text-sm text-green-700 mb-1">Total de Locais</div>
              <div className="text-3xl font-bold text-green-900">{locations.length}</div>
            </div>
            <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
              <div className="text-sm text-purple-700 mb-1">Total de Checklists</div>
              <div className="text-3xl font-bold text-purple-900">{savedChecklists.length}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-200">
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <img src="/touro.png" alt="CheckFlow Pro" className="h-10 w-10" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                CheckFlow Pro
              </h1>
            </div>

            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setSelectedTemplate(null);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 'home'
                    ? 'bg-red-100 text-red-700'
                    : 'text-red-600 hover:bg-red-100'
                }`}
              >
                <Home size={20} className="inline mr-2" />
                Início
              </button>
              <button
                onClick={() => {
                  setCurrentPage('checklists');
                  setSelectedTemplate(null);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 'checklists'
                    ? 'bg-red-100 text-red-700'
                    : 'text-red-600 hover:bg-red-100'
                }`}
              >
                <List size={20} className="inline mr-2" />
                Checklists
              </button>
              <button
                onClick={() => {
                  setCurrentPage('settings');
                  setSelectedTemplate(null);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === 'settings'
                    ? 'bg-red-100 text-red-700'
                    : 'text-red-600 hover:bg-red-100'
                }`}
              >
                <Settings size={20} className="inline mr-2" />
                Configurações
              </button>
            </nav>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden"
            >
              <Menu size={24} className="text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 shadow-lg">
          <nav className="p-4 space-y-2">
            <button
              onClick={() => {
                setCurrentPage('home');
                setMobileMenuOpen(false);
                setSelectedTemplate(null);
              }}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                currentPage === 'home'
                  ? 'bg-red-100 text-red-700'
                  : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <Home size={20} className="inline mr-2" />
              Início
            </button>
            <button
              onClick={() => {
                setCurrentPage('checklists');
                setMobileMenuOpen(false);
                setSelectedTemplate(null);
              }}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                currentPage === 'checklists'
                  ? 'bg-red-100 text-red-700'
                  : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <List size={20} className="inline mr-2" />
              Checklists
            </button>
            <button
              onClick={() => {
                setCurrentPage('settings');
                setMobileMenuOpen(false);
                setSelectedTemplate(null);
              }}
              className={`w-full px-4 py-3 rounded-lg font-semibold transition-all text-left ${
                currentPage === 'settings'
                  ? 'bg-red-100 text-red-700'
                  : 'text-red-600 hover:bg-red-100'
              }`}
            >
              <Settings size={20} className="inline mr-2" />
              Configurações
            </button>
          </nav>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'home' && renderHome()}
        {currentPage === 'new-checklist' && renderNewChecklist()}
        {currentPage === 'checklists' && renderChecklists()}
        {currentPage === 'settings' && renderSettings()}
      </main>

      <footer className="bg-red-50 border-t border-red-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="font-bold text-red-900 text-lg">CheckFlow Pro</p>
            <p className="text-red-600 text-sm">Sistema Profissional de Gestão de Checklists Operacionais</p>
            <p className="text-red-500 text-xs mt-2">© 2026 CheckFlow Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckFlowPro;