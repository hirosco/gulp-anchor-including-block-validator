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

      var keywords = "address|article|aside|blockquote|details|dialog|dd|div|dl|dt|fieldset|figcaption|figure|footer|form|h1|h2|h3|h4|h5|h6|header|hgroup|hr|li|main|nav|ol|p|pre|section|table|ul|"

      // check block level element in a tag
      var check = new RegExp("<a .+?>([^<]*?)<(?:"+keywords+search+")(.|\r|\n)*?</a>", "g");
      var result = check.test(contents);
      var match = contents.match(check);

      if (result) {
        // console.log('WARNING A TAG : ' + match);
        this.emit('error', new PluginError(atag, 'WARNING A TAG : ' + match));
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

