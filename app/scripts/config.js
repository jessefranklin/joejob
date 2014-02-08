'use strict';

//Global configuration settings for application

app.value('globalConfig', {
  cache : {
    maxAge: 90000, // Items added to this cache expire after 15 minutes.
    cacheFlushInterval: 600000, // This cache will clear itself every hour.
    deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
  },
  persistentCache : {
    storageMode: 'localStorage' // This cache will sync itself with `localStorage`.
  },
  session : {
    inactivityTime: 20 * 60 * 1000
  }
});