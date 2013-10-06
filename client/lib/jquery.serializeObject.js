// object representation of HTML form
// http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
$.fn.serializeObject = function()
{
    var o = {},
        a = this.serializeArray();

    $.each(a, function() {
      var name = this.name
      if (o[name] !== undefined) {
          if (!o[name].push) {
              o[name] = [o[name]];
          }
          o[name].push(this.value || '');
      } else {
          o[name] = this.value || '';
      }
    });

    return o;
};
