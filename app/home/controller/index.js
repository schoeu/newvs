'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _base = require('./base.js');

var _base2 = _interopRequireDefault(_base);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _class = function (_Base) {
    (0, _inherits3.default)(_class, _Base);

    function _class() {
        (0, _classCallCheck3.default)(this, _class);
        return (0, _possibleConstructorReturn3.default)(this, _Base.apply(this, arguments));
    }

    /**
    * index action
    * @return {Promise} []
    */

    _class.prototype.indexAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
            var data, username, i, oriImg, oriDate, pathArr;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _context.next = 2;
                            return this.model('articles').select();

                        case 2:
                            data = _context.sent;
                            _context.next = 5;
                            return this.session('islogin');

                        case 5:
                            username = _context.sent;


                            for (i = 0; i < data.length; i++) {
                                oriImg = data[i].images || '';
                                oriDate = data[i].date || new Date();
                                pathArr = oriImg.split(_path2.default.sep) || [];

                                data[i].date = think.datetime(oriDate).split(' ')[0];
                                data[i].images = '/static/' + pathArr.splice(-2, 2).join(_path2.default.sep);
                            }
                            this.assign({
                                datalist: data || []
                            });

                            return _context.abrupt('return', this.display());

                        case 9:
                        case 'end':
                            return _context.stop();
                    }
                }
            }, _callee, this);
        }));

        function indexAction() {
            return ref.apply(this, arguments);
        }

        return indexAction;
    }();

    // 登录操作


    _class.prototype.loginAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
            var userData, username, psw, data;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!this.isGet()) {
                                _context2.next = 4;
                                break;
                            }

                            this.display();
                            _context2.next = 13;
                            break;

                        case 4:
                            if (!this.isPost()) {
                                _context2.next = 13;
                                break;
                            }

                            userData = this.post();
                            username = userData.username || '';
                            psw = userData.password || '';

                            if (think.isEmpty(username)) {
                                _context2.next = 13;
                                break;
                            }

                            _context2.next = 11;
                            return this.model('users').field('password').where({ username: username }).select();

                        case 11:
                            data = _context2.sent;

                            if (data[0].password === psw) {
                                this.session('vslogin', username);
                                this.end('/article/edit');
                            }

                        case 13:
                        case 'end':
                            return _context2.stop();
                    }
                }
            }, _callee2, this);
        }));

        function loginAction() {
            return ref.apply(this, arguments);
        }

        return loginAction;
    }();

    // 个人信息


    _class.prototype.infoAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
            var username, data, rowData;
            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _context3.next = 2;
                            return this.session('islogin');

                        case 2:
                            username = _context3.sent;
                            _context3.next = 5;
                            return this.model('users').where({ username: username }).select();

                        case 5:
                            data = _context3.sent;
                            rowData = data[0];

                            this.assign({
                                nickname: rowData.nickname || '',
                                qq: rowData.qq || '',
                                email: rowData.email || '',
                                skills: rowData.skills || '',
                                years: rowData.years || '',
                                description: rowData.description || ''
                            });
                            this.assign({
                                username: username
                            });
                            this.display();

                        case 10:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee3, this);
        }));

        function infoAction() {
            return ref.apply(this, arguments);
        }

        return infoAction;
    }();

    // 作品信息


    _class.prototype.epinfoAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4() {
            var username, postData, updataData, data;
            return _regenerator2.default.wrap(function _callee4$(_context4) {
                while (1) {
                    switch (_context4.prev = _context4.next) {
                        case 0:
                            _context4.next = 2;
                            return this.session('islogin');

                        case 2:
                            username = _context4.sent;
                            postData = this.post();

                            if (this.isPost()) {
                                updataData = {
                                    title: postData.title || '',
                                    description: postData.description || '',
                                    classify_first: postData.classify_first || '',
                                    classify_second: postData.classify_second || '',
                                    date: postData.date || '',
                                    is_safe: postData.safe || '',
                                    images: file.path || '',
                                    authorization: postData.authorization || ''
                                };
                            }

                            _context4.next = 7;
                            return this.model('users').add(updataData);

                        case 7:
                            data = _context4.sent;

                            this.redirect('info');

                        case 9:
                        case 'end':
                            return _context4.stop();
                    }
                }
            }, _callee4, this);
        }));

        function epinfoAction() {
            return ref.apply(this, arguments);
        }

        return epinfoAction;
    }();

    _class.prototype.signinAction = function () {
        var ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5() {
            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                        case 'end':
                            return _context5.stop();
                    }
                }
            }, _callee5, this);
        }));

        function signinAction() {
            return ref.apply(this, arguments);
        }

        return signinAction;
    }();

    return _class;
}(_base2.default);

exports.default = _class;
//# sourceMappingURL=index.js.map