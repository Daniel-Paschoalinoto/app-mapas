const o={comentario:"",xpath:"(//*[@class='joblist__list']/section)[position() < last()]"},a={posclick:"",comentario:"",xpath:"//*[@class='job__header is-list']",processadores:[{nome:"",tipo:"RegexReplace",de:"^(?:(?!Nome da Empresa)[\\s\\S])*$",para:""},{nome:"",tipo:"Replace",de:"Cargo",para:"&"},{nome:"",tipo:"SplitFirst",de:"&",para:""},{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:!0,comentario:"",xpath:"descricaoPadrao",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""},{nome:"",tipo:"Replace",de:"Atribuições.",para:""}]},t={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"SplitFirst",de:"/",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},i={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"RegexMatch",de:"/.+",para:""},{nome:"",tipo:"Replace",de:"/",para:""}]},p={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},s={tipo:"",comentario:"",xpath:""},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},r={tipo:"eval",comentario:"",parametro:"eval",rota_principal:"script",script:"document.querySelector('#pagination > ul > li.material-icons.paginationItem.paginationNext').click()"},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:o,titulo:a,descricao:e,cidade:t,estado:i,tipo:p,url_detalhe:s,salario:c,paginacao:r,total_vagas:n,total_vagas_site:l,total_anuncios_site:d};export{t as cidade,m as default,e as descricao,i as estado,r as paginacao,o as root,c as salario,p as tipo,a as titulo,d as total_anuncios_site,n as total_vagas,l as total_vagas_site,s as url_detalhe};
