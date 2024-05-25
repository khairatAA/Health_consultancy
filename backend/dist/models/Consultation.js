"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Consultation = void 0;
// src/models/Consultation.ts
const sequelize_typescript_1 = require("sequelize-typescript");
const Patient_1 = require("./Patient");
const User_1 = require("./User");
let Consultation = (() => {
    let _classDecorators = [(0, sequelize_typescript_1.Table)({ tableName: 'consultations' })];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    let _classSuper = sequelize_typescript_1.Model;
    let _patientId_decorators;
    let _patientId_initializers = [];
    let _patientId_extraInitializers = [];
    let _officerId_decorators;
    let _officerId_initializers = [];
    let _officerId_extraInitializers = [];
    let _consultationType_decorators;
    let _consultationType_initializers = [];
    let _consultationType_extraInitializers = [];
    let _medicalCondition_decorators;
    let _medicalCondition_initializers = [];
    let _medicalCondition_extraInitializers = [];
    let _patient_decorators;
    let _patient_initializers = [];
    let _patient_extraInitializers = [];
    let _officer_decorators;
    let _officer_initializers = [];
    let _officer_extraInitializers = [];
    var Consultation = _classThis = class extends _classSuper {
        constructor() {
            super(...arguments);
            this.patientId = __runInitializers(this, _patientId_initializers, void 0);
            this.officerId = (__runInitializers(this, _patientId_extraInitializers), __runInitializers(this, _officerId_initializers, void 0));
            this.consultationType = (__runInitializers(this, _officerId_extraInitializers), __runInitializers(this, _consultationType_initializers, void 0));
            this.medicalCondition = (__runInitializers(this, _consultationType_extraInitializers), __runInitializers(this, _medicalCondition_initializers, void 0));
            this.patient = (__runInitializers(this, _medicalCondition_extraInitializers), __runInitializers(this, _patient_initializers, void 0));
            this.officer = (__runInitializers(this, _patient_extraInitializers), __runInitializers(this, _officer_initializers, void 0));
            __runInitializers(this, _officer_extraInitializers);
        }
    };
    __setFunctionName(_classThis, "Consultation");
    (() => {
        var _a;
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create((_a = _classSuper[Symbol.metadata]) !== null && _a !== void 0 ? _a : null) : void 0;
        _patientId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => Patient_1.Patient), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
            })];
        _officerId_decorators = [(0, sequelize_typescript_1.ForeignKey)(() => User_1.User), (0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.INTEGER,
                allowNull: false,
            })];
        _consultationType_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _medicalCondition_decorators = [(0, sequelize_typescript_1.Column)({
                type: sequelize_typescript_1.DataType.STRING,
                allowNull: false,
            })];
        _patient_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => Patient_1.Patient)];
        _officer_decorators = [(0, sequelize_typescript_1.BelongsTo)(() => User_1.User)];
        __esDecorate(null, null, _patientId_decorators, { kind: "field", name: "patientId", static: false, private: false, access: { has: obj => "patientId" in obj, get: obj => obj.patientId, set: (obj, value) => { obj.patientId = value; } }, metadata: _metadata }, _patientId_initializers, _patientId_extraInitializers);
        __esDecorate(null, null, _officerId_decorators, { kind: "field", name: "officerId", static: false, private: false, access: { has: obj => "officerId" in obj, get: obj => obj.officerId, set: (obj, value) => { obj.officerId = value; } }, metadata: _metadata }, _officerId_initializers, _officerId_extraInitializers);
        __esDecorate(null, null, _consultationType_decorators, { kind: "field", name: "consultationType", static: false, private: false, access: { has: obj => "consultationType" in obj, get: obj => obj.consultationType, set: (obj, value) => { obj.consultationType = value; } }, metadata: _metadata }, _consultationType_initializers, _consultationType_extraInitializers);
        __esDecorate(null, null, _medicalCondition_decorators, { kind: "field", name: "medicalCondition", static: false, private: false, access: { has: obj => "medicalCondition" in obj, get: obj => obj.medicalCondition, set: (obj, value) => { obj.medicalCondition = value; } }, metadata: _metadata }, _medicalCondition_initializers, _medicalCondition_extraInitializers);
        __esDecorate(null, null, _patient_decorators, { kind: "field", name: "patient", static: false, private: false, access: { has: obj => "patient" in obj, get: obj => obj.patient, set: (obj, value) => { obj.patient = value; } }, metadata: _metadata }, _patient_initializers, _patient_extraInitializers);
        __esDecorate(null, null, _officer_decorators, { kind: "field", name: "officer", static: false, private: false, access: { has: obj => "officer" in obj, get: obj => obj.officer, set: (obj, value) => { obj.officer = value; } }, metadata: _metadata }, _officer_initializers, _officer_extraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        Consultation = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return Consultation = _classThis;
})();
exports.Consultation = Consultation;
