const o={comentario:"",xpath:"//*[contains(@class, 'col-lg-12') and contains(@id, '/job')]"},a={posclick:"",comentario:"",xpath:"//*[contains(@class, 'col-lg-12') and contains(@id, '/job')]",processadores:[{nome:"",tipo:"RegexReplace",de:"^(?:(?!Nome da Empresa)[\\s\\S])*$",para:""},{nome:"",tipo:"RegexReplace",de:"Nome da Empresa.+",para:""},{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:"",comentario:"",xpath:"//p[@itemprop='description']",processadores:[{nome:"",tipo:"Replace",de:"/ vaga cód",para:"&"},{nome:"",tipo:"SplitFirst",de:"&",para:""},{nome:"padraoDescricao",tipo:"",de:"",para:""}]},t={posclick:"",comentario:"",xpath:"//*[@class='locality']",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},p={posclick:"",comentario:"",xpath:"//*[@itemprop='addressRegion']",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},c={tipo:"click",comentario:"",xpath:"//*[@itemprop='url']"},i={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},r={tipo:"",comentario:"",parametro:"",rota_principal:"",script:""},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:o,titulo:a,descricao:e,cidade:t,estado:p,tipo:s,url_detalhe:c,salario:i,paginacao:r,total_vagas:n,total_vagas_site:d,total_anuncios_site:l};export{t as cidade,m as default,e as descricao,p as estado,r as paginacao,o as root,i as salario,s as tipo,a as titulo,l as total_anuncios_site,n as total_vagas,d as total_vagas_site,c as url_detalhe};
