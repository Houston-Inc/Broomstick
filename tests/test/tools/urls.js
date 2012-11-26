define(['tools/urls'], function(urls) {
    "use strict";
    describe('urls', function() {
        describe('sanitizeToURL', function() {
            it('changes ä, ö to a o', function() {
                expect(urls.sanitizeToURL('äö')).to.eql('ao');
            });
            it('changes Äteritsi puteritsi to ateritsi-puteritsi', function() {
                expect(urls.sanitizeToURL('Äteritsi puteritsi')).to.eql('ateritsi-puteritsi');
            });
        });
    });
});
