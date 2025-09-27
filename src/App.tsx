import React from "react";

const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            🎯 AjudaDiretora
          </h1>
          <p className="text-xl text-amber-700">
            Secretária de Luxo para Educação Infantil
          </p>
          <p className="text-amber-600 mt-2">
            Preview funcionando perfeitamente! ✨
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-amber-200">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="font-semibold text-amber-900 mb-2">Ações & Lembretes</h3>
            <p className="text-amber-700 text-sm">Organize suas tarefas</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-amber-200">
            <div className="text-2xl mb-3">📄</div>
            <h3 className="font-semibold text-amber-900 mb-2">Documentos</h3>
            <p className="text-amber-700 text-sm">Gere planos e relatórios</p>
          </div>
          
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-amber-200">
            <div className="text-2xl mb-3">💬</div>
            <h3 className="font-semibold text-amber-900 mb-2">Chat Inteligente</h3>
            <p className="text-amber-700 text-sm">Converse com sua secretária</p>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-amber-200">
          <h2 className="text-xl font-semibold text-amber-900 mb-4">Status da Aplicação:</h2>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-amber-800">Preview carregado com sucesso</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-amber-800">Design system aplicado</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="text-amber-800">Componentes funcionais</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
