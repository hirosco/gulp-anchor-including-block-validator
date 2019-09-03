var through = require('through2');
var rs = require('replacestream');
var PluginError = require('gulp-util').PluginError;
var atag = 'gulp-block-level-in-a-tag-validator';

module.exports = function(search) {
  /**
   * @this {Transform}
   */
  var transform = function(file, encoding, callback) {
    if (file.isNull()) {
      // 何もしない
      return callback(null, file);
    }

    if (file.isStream()) {
      file.contents = file.contents.pipe(rs(search));
      // ストリームはサポートしない
      this.emit('error', new PluginError(PLUGIN_NAME, PLUGIN_NAME + ':Streams not supported!'));
    }

    // プラグインの処理本体
    if (file.isBuffer()) {
      
      // ファイルの内容をcontentsに読み込み
      var contents = String(file.contents);

      var keywords = "address|article|aside|blockquote|details|dialog|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|li|main|nav|ol|p|pre|section|table|ul|";
      var keywords = keywords + search;

      // check block level element in a tag
      var check = new RegExp("<a(?: .+?)?>([^]*?)</a>", "g");
      // var result = check.test(contents);
      var match = contents.match(check);

      var contents2 = String(match);

      var check2 = new RegExp("<(?:"+keywords+").+?>", "g");
      var result2 = check2.test(contents2);
      var match2 = contents2.match(check2);

      if (result2) {
        // console.log('WARNING A TAG : ' + match2);
        this.emit('error', new PluginError(atag, 'WARNING A TAG : ' + match2));
      } else {
        // console.log('no problem');
      }

      // 処理の完了を通知
      return callback(null, file);
    }

    this.push(file);
    callback();
  };

  return through.obj(transform);
};

