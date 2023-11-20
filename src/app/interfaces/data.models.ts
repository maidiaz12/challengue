export interface DatosGenerales {
    calle: string | null;
    altura: string | null;
    piso: string | null;
    departamento: string | null;
    codigoPostal: string | null;
    localidad: string | null;
    telefono: string | null;
    numCustodia: string | null;
    numPerfil: number;
    eMail: string | null;
    esFisico: boolean;
    estaAnulado: boolean;
    fechaIngreso: string;
    requiereFirmaConjunta: boolean;
    numero: number;
    nombre: string;
    idCuotapartista: string;
    idCoreBanco: string | null;
}

export interface DatosJuridicos {
    lugarConstitucion: string | null;
    libro: string | null;
    numInscripcion: string | null;
    tomo: string | null;
    escritura: string | null;
    folio: string | null;
    fechaConstitucion: string | null;
    tipoEstadoOCDE: {
        estaAnulado: boolean;
        descripcion: string | null;
        idEntidad: string;
    };
    statusFatca: {
        estaAnulado: boolean;
        descripcion: string | null;
        idEntidad: string;
    };
    esSujetoObligado: boolean;
    cuit: number;
    tipoContribuyente: {
        estaAnulado: boolean;
        descripcion: string | null;
        idEntidad: string;
    };
}

export interface TipoDocumentoIdentidad {
    descripcion: string;
    codDocIdentidad: string;
    idTipoDocumentoIdentidad: string;
    estaAnulado: boolean;
}

export interface Titular {
    tipoDocumentoIdentidad: TipoDocumentoIdentidad;
    nombre: string;
    apellido: string;
    idPersona: string;
    numDocumento: number;
    cuit: number;
    cuil: number;
    cdi: number;
    estaAnulado: boolean;
}

export interface Moneda {
    simbolo: string;
    idMoneda: string;
    codISO: string;
    idCAFCI: string;
    descripcion: string;
    estaAnulado: boolean;
}

export interface TipoCuentaBancaria {
    estaAnulado: boolean;
    descripcion: string;
    idEntidad: string;
}

export interface Banco {
    estaAnulado: boolean;
    descripcion: string;
    idEntidad: string;
}

export interface CuentaBancaria {
    moneda: Moneda;
    tipoCuentaBancaria: TipoCuentaBancaria;
    banco: Banco;
    numSucursal: number;
    fechaApertura: string | null;
    alias: string | null;
    aba: string | null;
    swift: string | null;
    iban: string | null;
    descripcion: string;
    numeroCuenta: string;
    cbu: string | null;
    cuitTitular: string | null;
    idCptCuentaBancaria: string;
}

export interface DataInterface {
    datosGenerales: DatosGenerales;
    datosJuridicos: DatosJuridicos;
    titulares: Titular[];
    cuentasBancarias: CuentaBancaria[];
}