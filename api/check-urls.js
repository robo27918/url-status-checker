"use strict";
/**
 * This file handles POST requests
   - things to add
      index.html to send the requests
          

*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = handler;
const http_1 = __importDefault(require("http"));
function checkUrl(url) {
    return new Promise((resolve) => {
        http_1.default
            .get(url, (res) => {
            resolve({ url, status: res.statusCode || "Unknown" });
        })
            .on("error", (err) => {
            resolve({ url, status: err.message });
        });
    });
}
function handler(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        if (req.method !== "POST") {
            res.status(405).json({ error: "Method not allowed" });
            return;
        }
        const { urls } = req.body;
        if (!urls || !Array.isArray(urls)) {
            res.status(400).json({ error: 'Invalid input: "urls" must be an array' });
            return;
        }
        const results = yield Promise.all(urls.map(checkUrl));
        res.status(200).json(results);
    });
}
