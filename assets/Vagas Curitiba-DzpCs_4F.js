const o={comentario:"Esse layout também serve para o domínio empregosvagasbh.com.br",xpath:"//article[contains(@class, 'jobs') and not(descendant::*[contains(@class, 'jobs__selo')])]"},a={posclick:"",comentario:"",xpath:"//article[contains(@class, 'jobs') and not(descendant::*[contains(@class, 'jobs__selo')])]",processadores:[{nome:"",tipo:"RegexReplace",de:"^(?:(?!Nome da Empresa)[\\s\\S])*$",para:""},{nome:"",tipo:"RegexReplace",de:"Nome da Empresa.+",para:""},{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:!0,comentario:"",xpath:"//*[@class='jobs__desc']",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"//*[@class='jobs__regiao']",processadores:[{nome:"",tipo:"SplitFirst",de:",",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},t={posclick:"",comentario:"",xpath:"//*[@class='jobs__regiao']",processadores:[{nome:"",tipo:"RegexMatch",de:",.+",para:""},{nome:"",tipo:"Replace",de:",",para:""}]},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},p={tipo:"href",comentario:"",xpath:"//article[contains(@class, 'jobs') and not(descendant::*[contains(@class, 'jobs__selo')])]//a"},i={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},r={tipo:"",comentario:"",parametro:"",rota_principal:"",script:""},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:o,titulo:a,descricao:e,cidade:s,estado:t,tipo:c,url_detalhe:p,salario:i,paginacao:r,total_vagas:n,total_vagas_site:d,total_anuncios_site:l};export{s as cidade,m as default,e as descricao,t as estado,r as paginacao,o as root,i as salario,c as tipo,a as titulo,l as total_anuncios_site,n as total_vagas,d as total_vagas_site,p as url_detalhe};