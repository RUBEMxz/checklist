'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  CheckCircle2, Plus, Trash2, X, Calendar, MapPin, Camera,
  Save, Settings, Home, List, Menu, Edit2, AlertCircle,
  Building2, FileText, ChevronDown, Search, Download
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
  photos: Record<string, any>;
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

  const [locations, setLocations] = useState([
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
  ]);

  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState('');

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

  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);

  const [currentChecklist, setCurrentChecklist] = useState<ChecklistState>({
    location: '',
    date: '',
    answers: {},
    observations: {},
    photos: {}
  });

  const [savedChecklists, setSavedChecklists] = useState<SavedChecklist[]>([]);

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

  const calculateScore = () => {
    if (!selectedTemplate) return { total: 0, achieved: 0, percentage: 0 };

    let totalPoints = 0;
    let achievedPoints = 0;

    selectedTemplate!.sections.forEach(section => {
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

  const saveChecklist = () => {
    const score = calculateScore();
    const checklist = {
      id: Date.now(),
      template: selectedTemplate!.name,
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
  };

  const renderHome = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">CheckFlow Pro</h1>
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
          {templates.map(template => {
            const totalQuestions = template.sections.reduce((acc, s) => acc + s.questions.length, 0);
            const totalPoints = template.sections.reduce((acc, s) =>
              acc + s.questions.reduce((sum, q) => sum + q.points, 0), 0
            );

            return (
              <div
                key={template.id}
                className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all cursor-pointer group"
                onClick={() => {
                  setSelectedTemplate(template);
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
                  {template.name}
                </h3>
                <p className="text-sm text-red-600 mb-4">{template.description}</p>
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
    const allRequiredAnswered = selectedTemplate.sections.every(section =>
      section.questions.filter(q => q.required).every(q => currentChecklist.answers[q.id])
    );

    return (
      <div className="max-w-4xl mx-auto space-y-6">
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
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base"
              >
                <option value="">Escolher</option>
                {locations.map(loc => (
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

        {selectedTemplate.sections.map(section => (
          <div key={section.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gray-700 text-white px-6 py-4">
              <h2 className="text-xl font-bold">{section.title}</h2>
              {section.subtitle && (
                <p className="text-white/80 text-sm italic mt-1">{section.subtitle}</p>
              )}
            </div>

            <div className="p-6 space-y-6">
              {section.questions.length > 0 ? (
                section.questions.map(question => (
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
                      className="w-full px-4 py-3 border-2 border-red-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-base"
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
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []);
                    // Aqui você pode adicionar lógica para processar os arquivos
                    console.log('Arquivos selecionados:', files);
                  }}
                />
                <button
                  onClick={() => document.getElementById(`photo-${section.id}`)?.click()}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Plus size={20} />
                  Adicionar arquivo
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-red-200 sticky bottom-4">
          <div className="flex items-center justify-between mb-6">
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

          <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
            <div
              className="bg-gradient-to-r from-indigo-600 to-purple-600 h-4 rounded-full transition-all duration-300"
              style={{ width: `${score.percentage}%` }}
            ></div>
          </div>

          <div className="flex flex-col md:flex-row gap-4">
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
              className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-bold hover:bg-gray-50 transition-all text-lg"
            >
              Cancelar
            </button>
            <button
              onClick={saveChecklist}
              disabled={!currentChecklist.location || !currentChecklist.date || !allRequiredAnswered}
              className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-4 rounded-xl font-bold hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 text-lg"
            >
              <Save size={24} />
              Salvar Checklist
            </button>
          </div>

          {(!currentChecklist.location || !currentChecklist.date || !allRequiredAnswered) && (
            <div className="mt-5 flex items-center gap-3 text-amber-700 bg-amber-50 p-4 rounded-xl border border-amber-200">
              <AlertCircle size={24} />
              <span className="text-sm font-medium">
                Preencha todos os campos obrigatórios (marcados com *) antes de salvar
              </span>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderChecklists = () => (
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
          {savedChecklists.map(checklist => (
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
                  <span className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {checklist.score.percentage}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 h-3 rounded-full transition-all"
                    style={{ width: `${checklist.score.percentage}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {checklist.score.achieved} de {checklist.score.total} pontos
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium text-sm">
                  Ver Detalhes
                </button>
                <button className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors font-medium text-sm">
                  <Download size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderSettings = () => (
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
              <div key={location} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group">
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
              <p>Organize seus locais de forma consistente. Ex: "Nome da Rede - Cidade" para facilitar buscas e filtros futuros.</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-red-200">
      <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex flex-col items-center">
                <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                  CheckFlow Pro
                </h1>
                <Image src="/Captura de tela 2026-01-18 183155.png" alt="Logo" width={32} height={32} className="rounded shadow" />
              </div>
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
            <div className="flex items-center justify-center gap-2 mb-3">
              <Image src="/next.svg" alt="Logo" width={32} height={32} className="rounded-lg" />
              <p className="font-bold text-red-900 text-lg">CheckFlow Pro</p>
            </div>
            <p className="text-red-600 text-sm">Sistema Profissional de Gestão de Checklists Operacionais</p>
            <p className="text-red-500 text-xs mt-2">© 2026 CheckFlow Pro. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CheckFlowPro;
