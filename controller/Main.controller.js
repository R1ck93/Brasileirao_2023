sap.ui.define(
  ["sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
],
  /**
   * @param {typeof sap.ui.core.mvc.Controller} Controller
   */
  function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("campeonatobrasileiro.controller.Main", {
      onInit: function () {

        /* //vamos criar um modelo
        //antes, as variaveis que vão no modelo
        var dadosGerais = {
            rodada : '9a',
            campeonato : "Brasileirão 2023 do canal FIORINET"
        };


        //agora sim vamos criar o modelo
        var dadosModel = new JSONModel();
        dadosModel.setData(dadosGerais);
        var view = this.getView();
        view.setModel(dadosModel, "ModeloDadosGerais");
 */

          var dadosGerais = {};
          var classificacao = {};
          var partidas = {};

          var dadosModel = new JSONModel(dadosGerais);
          var classificacaoModel = new JSONModel(classificacao);
          var partidasModel = new JSONModel(partidas);

          this.getView().setModel(dadosModel, "ModeloDadosGerais");
          this.getView().setModel(classificacaoModel, "ModeloClassificacao");
          this.getView().setModel(partidasModel, "ModeloPartidas");

          this.buscarDadosGerais();
          this.buscarClassificacao();
          this.buscarPartidas();

      },

      buscarDadosGerais: function(){
        //obter o model

        var dadosModel2 = this.getView().getModel("ModeloDadosGerais");

        const configuracoes = {
          url : "https://api.api-futebol.com.br/v1/campeonatos/10",
          method : "GET",
          async : true, 
          crossDomain : true,
          headers : {
            "Authorization" : "Bearer live_94f89ec372eca839ff395f799e09fa",
          }
        };

        $.ajax(configuracoes)

        .done(function(resposta){
          dadosModel2.setData(resposta);
          this.buscarPartidas(resposta.rodada_atual.rodada);

        }.bind(this))

        .fail(function(erro){

        });

      },

      buscarClassificacao: function(){
        //obter o model

        var classificacao = this.getView().getModel("ModeloClassificacao");

        const configuracoes = {
          url : "https://api.api-futebol.com.br/v1/campeonatos/10/tabela",
          method : "GET",
          async : true, 
          crossDomain : true,
          headers : {
            "Authorization" : "Bearer live_94f89ec372eca839ff395f799e09fa",
          }
        };

        $.ajax(configuracoes)

        .done(function(resposta){
          classificacao.setData({"Classificacao" : resposta});

        })

        .fail(function(erro){

        });

      },

      buscarPartidas: function(rodada){
        //obter o model

        var partidasModel2 = this.getView().getModel("ModeloPartidas");

        const configuracoes = {
          url : "https://api.api-futebol.com.br/v1/campeonatos/10/rodadas/" + rodada,
          method : "GET",
          async : true, 
          crossDomain : true,
          headers : {
            "Authorization" : "Bearer live_94f89ec372eca839ff395f799e09fa",
          }
        };

        $.ajax(configuracoes)

        .done(function(resposta){
          partidasModel2.setData(resposta);

        })

        .fail(function(erro){

        });

      }
    });
  }
);
