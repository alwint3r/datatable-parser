Datatable Parser
================

A request parser for jquery datatable server-side processing request.

## API

```
parser(datatablesRequest: Object) -> Object
```

Where `datatablesRequest` is the request body (or mostly query string) sent by jquery datatables to the server.

Output description:

* `search: Array<Object>`- Array of key-value pairs where the key is the column name and the value is the search value.
* `order: Array<Array>` - Array of arrays which follows the `[column_name, ordering_direction]` format. Where `ordering_direction` is either `asc` or `desc`.
* `columns: Array<String>` - Array of column names.
* `start: Number` - Offset of requested data.
* `length: Number` - Length of requested data.

## How To Use

This example assumes that you're using express and the request is sent with GET method. You can replace `req.query` with `req.body` if the datatables use POST instead of GET.

```js
const parser = require('datatable-parser');
/* ... */
/* Inside express middleware */
const parsedRequest = parser(req.query);
/* Do something with parsedRequest */
```

## Testing

```bash
git clone https://github.com/alwint3r/datatable-parser.git
cd datatabe-parser
npm test
```

## License

The MIT License (MIT)
Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
