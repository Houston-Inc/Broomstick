// This module has to exist to stop "jam compile" (without any includes)
// breaking. Don't include all bootstrap js plugins here, leave it up to devs
// to manually include the ones they want when doing "jam compile".

define('bootstrap', ['../application/jam/bootstrap/js/bootstrap-button','../application/jam/bootstrap/js/bootstrap-modal'], function () {
    // nothing to return
    return;
});
