const o={comentario:"",xpath:"(//*[@class='joblist__list']/section)[position() < last()]"},a={posclick:"",comentario:"",xpath:"//*[@class='job__header is-list']",processadores:[{nome:"",tipo:"RegexReplace",de:"^(?:(?!Nome da Empresa)[\\s\\S])*$",para:""},{nome:"",tipo:"Replace",de:"Cargo",para:"&"},{nome:"",tipo:"SplitFirst",de:"&",para:""},{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:!0,comentario:"",xpath:"//[@class='description__container' and contains(.,'Atribuições')]",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""},{nome:"",tipo:"RegexReplace",de:"Atribuições.|Atribuições",para:""}]},t={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"SplitFirst",de:"/",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"RegexMatch",de:"/.+",para:""},{nome:"",tipo:"Replace",de:"/",para:""}]},i={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},p={tipo:"href",comentario:"",xpath:"//[contains(@class, 'jobvipcandidacy')]//h2//a"},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},r={tipo:"",comentario:"",parametro:"?Page=2",rota_principal:"https://www.bne.com.br/vagas-de-emprego/Usa%20park",script:""},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:o,titulo:a,descricao:e,cidade:t,estado:s,tipo:i,url_detalhe:p,salario:c,paginacao:r,total_vagas:n,total_vagas_site:d,total_anuncios_site:l};export{t as cidade,m as default,e as descricao,s as estado,r as paginacao,o as root,c as salario,i as tipo,a as titulo,l as total_anuncios_site,n as total_vagas,d as total_vagas_site,p as url_detalhe};
