const a={comentario:"Caso tenha paginação use a URL da paginação, pois é diferente da rota Index.",xpath:"//*[@class='row']//*[@class='col-sm-12 vaga']"},o={posclick:"",comentario:"",xpath:"//*[@class='col-sm-12 vaga']//h3",processadores:[{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:!0,comentario:"Verifique se a melhor descrição está dentro do click ou fora, pois a cada mapa existem variações de campos e estrutura.",xpath:"//*[@class='col-sm-9 col-print-9']",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""}]},t={posclick:"",comentario:"Caso a empresa costume preencher a cidade em todas as vagas, inserir X-path",xpath:"//span[@title='Localidade']",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},p={tipo:"click",comentario:"",xpath:"//*[@class='col-sm-12 vaga']//h3"},r={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},i={tipo:"",comentario:"",parametro:"&pagina=2",rota_principal:"https://prd-pc1.lg.com.br/Vagas/c/2352DB75-F65F-488D-9D48-ABF414775B60/p/Time_Top/pt-BR/Busca/Busca?termoDaBusca=",script:""},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={root:a,titulo:o,descricao:e,cidade:t,estado:s,tipo:c,url_detalhe:p,salario:r,paginacao:i,total_vagas:n,total_vagas_site:d,total_anuncios_site:m};export{t as cidade,l as default,e as descricao,s as estado,i as paginacao,a as root,r as salario,c as tipo,o as titulo,m as total_anuncios_site,n as total_vagas,d as total_vagas_site,p as url_detalhe};