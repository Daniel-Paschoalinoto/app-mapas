const o={comentario:"",xpath:"(//*[@class='joblist__list']/section[contains(., 'Nome da Empresa')])"},a={posclick:"",comentario:"",xpath:"//*[@class='job__header is-list']//a/text( )",processadores:[{nome:"padraoTitulo",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},t={posclick:!0,comentario:"",xpath:"//*[@class='description__container' and contains(.,'Atribuições')]",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""},{nome:"",tipo:"RegexReplace",de:"Atribuições.|Atribuições",para:""}]},e={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"SplitFirst",de:"/",para:""},{nome:"",tipo:"SplitLast",de:",",para:""},{nome:"",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"//h3[@class='job__detail' and contains(.,'Localização')]/text( )[normalize-space( )]",processadores:[{nome:"",tipo:"RegexMatch",de:"/.+",para:""},{nome:"",tipo:"Replace",de:"/",para:""}]},i={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},p={tipo:"href",comentario:"",xpath:"(//*[@class='joblist__list']/section)[position() < last()]//h2//a"},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},r={tipo:"",comentario:"",parametro:"?Page=2",rota_principal:"https://www.bne.com.br/vagas-de-emprego/Usa%20park",script:""},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:o,titulo:a,descricao:t,cidade:e,estado:s,tipo:i,url_detalhe:p,salario:c,paginacao:r,total_vagas:n,total_vagas_site:d,total_anuncios_site:l};export{e as cidade,m as default,t as descricao,s as estado,r as paginacao,o as root,c as salario,i as tipo,a as titulo,l as total_anuncios_site,n as total_vagas,d as total_vagas_site,p as url_detalhe};
