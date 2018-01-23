# CNSMO API
This is an API which allows administrators to perform modifications and other operations over deployed cnsmo services

## API Methods

**Users**
*method* POST 
*url*: '/authenticate',  *body params*: { username, password } 


----------


**Firewall**
*method* POST,
*url*: '/services/fw/rules', 
*body params*: { direction, protocol, dst_port, dst_src, ip_range, action }

*method* GET, 
*url*: '/services/fw/rules';


----------


**Nodes**
*method* GET 
*url*: '/services/sdn/nodes';

method: GET,
*url*: '/services/sdn/flows',


----------


**TCP Ports**
*method* GET
*url*: '/services/sdn/nodes/:instanceId/blockedTcpPorts',

*method* PUT
*url*: '/services/sdn/blockbyport',

*method* DELETE
*url*: '/services/sdn/nodes/:instanceId/flows/:flowId',


----------


**Certs**
*method* POST
*url*: '/certs/clients/:name',

*method* GET
*url*: '/certs/clients/:name/key',

*method* GET
*url*: '/certs/clients/:name/cert',

*method* GET
*url*: '/certs/clients/:name/config',

*method* GET
*url*: '/certs/clients/:name/ca',


----------


**DNS**
*method* GET
*url*: '/services/dns/records',

*method* POST
*url*: '/services/dns/record',
