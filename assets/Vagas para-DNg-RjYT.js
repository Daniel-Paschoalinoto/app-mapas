const a={comentario:"Esse mapa é para urls como vagasparasc.com.br/vagasparasp.com.br",xpath:"//*[@class='job-card-search'][contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), 'Nome da Empresa')]"},o={posclick:"",comentario:"",xpath:"//*[@class='job-card-search']//h3/text( )",processadores:[{nome:"padraoTitulo",tipo:"",de:"",para:""}]},e={posclick:!0,comentario:"",xpath:"//*[@class='job-description-text']",processadores:[{nome:"padraoDescricao",tipo:"",de:"",para:""}]},t={posclick:"",comentario:"",xpath:"//*[@class='location']",processadores:[{nome:"",tipo:"SplitFirst",de:",",para:""},{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},s={posclick:"",comentario:"",xpath:"//*[@class='location']",processadores:[{nome:"",tipo:"Replace",de:", Brasil",para:""},{nome:"",tipo:"RegexMatch",de:",.+",para:""},{nome:"",tipo:"Replace",de:",",para:""}]},c={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""}]},p={tipo:"href",comentario:"",xpath:"//*[@class='job-card-search']/a"},r={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},i={tipo:"eval",comentario:"",parametro:"eval",rota_principal:"script",script:"document.querySelector('.page-link.next').click()"},n={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},d={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},l={posclick:"",comentario:"",xpath:"",processadores:[{nome:"",tipo:"",de:"",para:""},{nome:"",tipo:"",de:"",para:""}]},m={root:a,titulo:o,descricao:e,cidade:t,estado:s,tipo:c,url_detalhe:p,salario:r,paginacao:i,total_vagas:n,total_vagas_site:d,total_anuncios_site:l};export{t as cidade,m as default,e as descricao,s as estado,i as paginacao,a as root,r as salario,c as tipo,o as titulo,l as total_anuncios_site,n as total_vagas,d as total_vagas_site,p as url_detalhe};
