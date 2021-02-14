const QUEUE = {
  ADDRESS_PROCESSING: 'address-processing',
  EVENT_PROCESSING: 'event-processing',
  FILL_INDEXING: 'fill-indexing',
  FILL_PROCESSING: 'fill-processing',
  INDEXING: 'indexing',
  TOKEN_PROCESSING: 'token-processing',
  TRANSACTION_PROCESSING: 'transaction-processing',
  TRADED_TOKEN_INDEXING: 'traded-token-indexing',
};

const JOB = {
  BULK_UPDATE_TOKEN_METADATA: 'bulk-update-token-metadata',
  CONVERT_PROTOCOL_FEE: 'convert-protocol-fee',
  CONVERT_RELAYER_FEES: 'convert-relayer-fees',
  CREATE_FILLS_FOR_EVENT: 'create-fills-for-event',
  CREATE_TOKEN: 'create-token',
  FETCH_ADDRESS_TYPE: 'fetch-address-type',
  FETCH_TOKEN_METADATA: 'fetch-token-metadata',
  FETCH_TRANSACTION: 'fetch-transaction',
  INDEX_FILL: 'index-fill',
  INDEX_FILL_PROTOCOL_FEE: 'index-fill-protocol-fee',
  INDEX_FILL_TRADERS: 'index-fill-traders',
  INDEX_FILL_VALUE: 'index-fill-value',
  INDEX_TRADED_TOKENS: 'index-traded-tokens',
};

module.exports = { JOB, QUEUE };
