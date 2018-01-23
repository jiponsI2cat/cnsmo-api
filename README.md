# CNSMO API
This is an API which allows administrators to perform modifications and other operations over deployed cnsmo services

## API Methods

**Users**

// Authentication of user by credentials

*method*: POST, *url*: '/authenticate', *body params*: { username, password };


----------


**Firewall**

// Adds new firewall rule to a list of rules

*method*: POST, *url*: '/services/fw/rules', *body params*: { direction, protocol, dst_port, dst_src, ip_range, action };

// Gets list of firewall rules

*method*: GET, *url*: '/services/fw/rules';


----------


**Nodes**

// Gets list of nodes (clients)

*method*: GET 
*url*: '/services/sdn/nodes';

// Gets list of flows 

method: GET,
*url*: '/services/sdn/flows',


----------


**TCP Ports**

// Gets list of blocked TCP ports of a node (client)

*method*: GET
*url*: '/services/sdn/nodes/:instanceId/blockedTcpPorts',

// Block a port 

*method*: PUT
*url*: '/services/sdn/blockbyport',

// Deletes a flow that contains a blocked port

*method*: DELETE
*url*: '/services/sdn/nodes/:instanceId/flows/:flowId',


----------


**Certs**

*method*: POST
*url*: '/certs/clients/:name',

*method*: GET
*url*: '/certs/clients/:name/key',

*method*: GET
*url*: '/certs/clients/:name/cert',

*method*: GET
*url*: '/certs/clients/:name/config',

*method*: GET
*url*: '/certs/clients/:name/ca',


----------


**DNS**

*method*: GET
*url*: '/services/dns/records',

*method*: POST
*url*: '/services/dns/record',
