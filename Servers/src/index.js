"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_js_1 = __importDefault(require("./app.js"));
const cors_1 = __importDefault(require("cors"));
app_js_1.default.use((0, cors_1.default)());
app_js_1.default.set('port', (process.env.PORT || 5000));
app_js_1.default.listen(app_js_1.default.get('port'), () => {
    console.log('app listening on port', app_js_1.default.get('port'));
});
