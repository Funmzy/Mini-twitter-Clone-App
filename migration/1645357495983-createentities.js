"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createentities1645357495983 = void 0;
class createentities1645357495983 {
    constructor() {
        this.name = 'createentities1645357495983';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77" FOREIGN KEY ("twitId") REFERENCES "twit"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "comment" DROP CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77"`);
            yield queryRunner.query(`ALTER TABLE "comment" ADD CONSTRAINT "FK_e3ff54d5615c07f5c561c8a8b77" FOREIGN KEY ("twitId") REFERENCES "twit"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
}
exports.createentities1645357495983 = createentities1645357495983;
