meteor-jsencrypt
================

Generate RSA Private and Public keys in meteor.


Generate Keys Example
================

```
crypt = new JSEncrypt({
    default_key_size: 2048
});
var dt = new Date();
var time = -(dt.getTime());
crypt.getKey();
dt = new Date();
time += (dt.getTime());

$('textarea[name="private_key"]').val(crypt.getPrivateKey());
$('textarea[name="public_key"]').val(crypt.getPublicKey());
```

Test Encryption Example
================

**Template**
```
<template name="test">
  <form action="/" method="POST">
      <p>
          <textarea class="form-control" placeholder="RSA Private Key" name="private_key" rows="5"></textarea>
      </p>
      <p>
          <textarea class="form-control" placeholder="RSA Public Key" name="public_key" rows="5"></textarea>
      </p>
      <p>
          <button type="button" id="generate_private_key" name="generate" class="btn btn-primary btn-small">Generate</button>
      </p>
  </form>
</template>
```

**Javascript**
```
Template.test.events = {
    'submit form': function(e) {
        e.preventDefault();
        var crypt_private = new JSEncrypt({
            default_key_size: 2048
        });
        crypt_private.setKey($(e.target).find('[name=private_key]').val());
        
        var crypt_public = new JSEncrypt({
            default_key_size: 2048
        });
        crypt_public.setKey($(e.target).find('[name=public_key]').val());
        
        var text = 'CCMED Test Encryption';
        // Encrypt the data with the public key.
        var enc = crypt_public.encrypt(text);
        
        // Now decrypt the crypted text with the private key.
        var dec = crypt_private.decrypt(enc);
        
        // Now a simple check to see if the round-trip worked.
        if (dec === text) {
           alert('Passed!');
        } else {
            alert('Unable to run encryption/decryption test with your private/public key. Are you sure they are valid?');
        }
    },
    'click #generate_private_key': function(e, template) {
        $('#generate_private_key').text("Generating...");
        alert('Hit OK to start generating. Your browser may lock up for a moment.');

        crypt = new JSEncrypt({
            default_key_size: 2048
        });
        var dt = new Date();
        var time = -(dt.getTime());
        crypt.getKey();
        dt = new Date();
        time += (dt.getTime());

        $('textarea[name="private_key"]').val(crypt.getPrivateKey());
        $('textarea[name="public_key"]').val(crypt.getPublicKey());
        $('#generate_private_key').text("Generate");
    }
}
```

Other Information
========================

This library heavily utilizes the wonderful work of Tom Wu found at http://www-cs-students.stanford.edu/~tjw/jsbn/.

This is a port of https://github.com/travist/jsencrypt that has been modified for including in meteor projects.
