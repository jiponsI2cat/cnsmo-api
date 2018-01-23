# CNSMO API
This is an API which allows administrators to perform modifications and other operations over deployed cnsmo services

## API Methods

**Users**

Authentication of user by credentials

>*method*: POST, *url*: '/authenticate', *body params*: { username, password }


----------


**Firewall**

Adds new firewall rule to a list of rules

>*method*: POST, *url*: '/services/fw/rules', *body params*: { direction: < "in"/"out" >, protocol: < "tcp/"udp"/... >, dst_port: < destination port >, dst_src: < "dst"/"src" >, ip_range: < "$ip/$CIDRMask" >, action:< "acpt"/"rjct" > }


Gets list of firewall rules (Actually mocked)

>*method*: GET, *url*: '/services/fw/rules'


----------


**Nodes**

Gets list of nodes (clients)

>*method*: GET,
*url*: '/services/sdn/nodes'

Gets list of flows 

>method: GET,
*url*: '/services/sdn/flows'


----------


**SDN Filters**

Gets list of blocked TCP ports of a node (client)

>*method*: GET,
*url*: '/services/sdn/nodes/:instanceId/blockedTcpPorts'

Block a port 

>*method*: PUT,
*url*: '/services/sdn/blockbyport',
*body params*: { tcp-destination-port: <destinationPort>, ip4-destination: <$ipDestination/$CIDRMask>,  ssinstanceid: <instanceId> }

Deletes a flow that contains a blocked port

>*method*: DELETE,
*url*: '/services/sdn/nodes/:instanceId/flows/:flowId'

Provides statistics of client's flows

>*method*: GET,
*url*: '/services/sdn/nodes/:instanceId/flows/:flowId/monitoring',

----------


**Certs**

Generates all the certificates of the new client by its name

>*method*: POST,
*url*: '/certs/clients/:name'

Gets the key cert

>*method*: GET,
*url*: '/certs/clients/:name/key'

Gets the client cert

>*method*: GET,
*url*: '/certs/clients/:name/cert'

Gets the config cert

>*method*: GET,
*url*: '/certs/clients/:name/config'

Gets ca cert

>*method*: GET,
*url*: '/certs/clients/:name/ca'


----------


**DNS**

Gets list of dns records

>*method*: GET,
*url*: '/services/dns/records'

Gets a dns record

>*method*: POST,
*url*: '/services/dns/record'
