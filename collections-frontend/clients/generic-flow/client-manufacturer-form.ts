import { FormInputTypeEnum } from "../../../src/enums/form";
import {
  BackendFrameworkEnum,
  FrontendFrameworkEnum,
} from "../../../src/enums/main";
import { MainInterface } from "../../../src/interfaces/main";

export const CLIENT_MANUFACTURER_FORM: MainInterface = {
  frontendFramework: FrontendFrameworkEnum.Angular,
  backendFramework: BackendFrameworkEnum.Loopback,
  form: {
    id: "clientManufacturerForm",
    title: "Fabricante de produtos",
    elements: [
      {
        input: {
          label: "Nome",
          name: "name",
          type: FormInputTypeEnum.Text,
          placeholder: "Ex.: Samsung",
          tooltip: "Nome da fabricante de produtos",
          isRequired: true,
        },
      },
      {
        select: {
          label: "País de origem",
          name: "country",
          type: FormInputTypeEnum.Text,
          optionsObject: [
            {
              label: "Afeganistão",
              value: "AF",
            },
            {
              label: "África do Sul",
              value: "ZA",
            },
            {
              label: "Albânia",
              value: "AL",
            },
            {
              label: "Alemanha",
              value: "DE",
            },
            {
              label: "Andorra",
              value: "AD",
            },
            {
              label: "Angola",
              value: "AO",
            },
            {
              label: "Anguilla",
              value: "AI",
            },
            {
              label: "Antártida",
              value: "AQ",
            },
            {
              label: "Antígua e Barbuda",
              value: "AG",
            },
            {
              label: "Arábia Saudita",
              value: "SA",
            },
            {
              label: "Argélia",
              value: "DZ",
            },
            {
              label: "Argentina",
              value: "AR",
            },
            {
              label: "Armênia",
              value: "AM",
            },
            {
              label: "Aruba",
              value: "AW",
            },
            {
              label: "Austrália",
              value: "AU",
            },
            {
              label: "Áustria",
              value: "AT",
            },
            {
              label: "Azerbaijão",
              value: "AZ",
            },
            {
              label: "Bahamas",
              value: "BS",
            },
            {
              label: "Bahrein",
              value: "BH",
            },
            {
              label: "Bangladesh",
              value: "BD",
            },
            {
              label: "Barbados",
              value: "BB",
            },
            {
              label: "Belarus",
              value: "BY",
            },
            {
              label: "Bélgica",
              value: "BE",
            },
            {
              label: "Belize",
              value: "BZ",
            },
            {
              label: "Benin",
              value: "BJ",
            },
            {
              label: "Bermudas",
              value: "BM",
            },
            {
              label: "Bolívia",
              value: "BO",
            },
            {
              label: "Bósnia-Herzegóvina",
              value: "BA",
            },
            {
              label: "Botsuana",
              value: "BW",
            },
            {
              label: "Brasil",
              value: "BR",
            },
            {
              label: "Brunei",
              value: "BN",
            },
            {
              label: "Bulgária",
              value: "BG",
            },
            {
              label: "Burkina Fasso",
              value: "BF",
            },
            {
              label: "Burundi",
              value: "BI",
            },
            {
              label: "Butão",
              value: "BT",
            },
            {
              label: "Cabo Verde",
              value: "CV",
            },
            {
              label: "Camarões",
              value: "CM",
            },
            {
              label: "Camboja",
              value: "KH",
            },
            {
              label: "Canadá",
              value: "CA",
            },
            {
              label: "Canárias",
              value: "IC",
            },
            {
              label: "Cazaquistão",
              value: "KZ",
            },
            {
              label: "Ceuta e Melilla",
              value: "EA",
            },
            {
              label: "Chade",
              value: "TD",
            },
            {
              label: "Chile",
              value: "CL",
            },
            {
              label: "China",
              value: "CN",
            },
            {
              label: "Chipre",
              value: "CY",
            },
            {
              label: "Cingapura",
              value: "SG",
            },
            {
              label: "Colômbia",
              value: "CO",
            },
            {
              label: "Comores",
              value: "KM",
            },
            {
              label: "Congo",
              value: "CG",
            },
            {
              label: "Coréia do Norte",
              value: "KP",
            },
            {
              label: "Coréia do Sul",
              value: "KR",
            },
            {
              label: "Costa do Marfim",
              value: "CI",
            },
            {
              label: "Costa Rica",
              value: "CR",
            },
            {
              label: "Croácia",
              value: "HR",
            },
            {
              label: "Cuba",
              value: "CU",
            },
            {
              label: "Curaçao",
              value: "CW",
            },
            {
              label: "Diego Garcia",
              value: "DG",
            },
            {
              label: "Dinamarca",
              value: "DK",
            },
            {
              label: "Djibuti",
              value: "DJ",
            },
            {
              label: "Dominica",
              value: "DM",
            },
            {
              label: "Egito",
              value: "EG",
            },
            {
              label: "El Salvador",
              value: "SV",
            },
            {
              label: "Emirados Árabes Unidos",
              value: "AE",
            },
            {
              label: "Equador",
              value: "EC",
            },
            {
              label: "Eritréia",
              value: "ER",
            },
            {
              label: "Eslováquia",
              value: "SK",
            },
            {
              label: "Eslovênia",
              value: "SI",
            },
            {
              label: "Espanha",
              value: "ES",
            },
            {
              label: "Estados Unidos",
              value: "US",
            },
            {
              label: "Estônia",
              value: "EE",
            },
            {
              label: "Etiópia",
              value: "ET",
            },
            {
              label: "Fiji",
              value: "FJ",
            },
            {
              label: "Filipinas",
              value: "PH",
            },
            {
              label: "Finlândia",
              value: "FI",
            },
            {
              label: "França",
              value: "FR",
            },
            {
              label: "Gabão",
              value: "GA",
            },
            {
              label: "Gâmbia",
              value: "GM",
            },
            {
              label: "Gana",
              value: "GH",
            },
            {
              label: "Geórgia",
              value: "GE",
            },
            {
              label: "Gibraltar",
              value: "GI",
            },
            {
              label: "Grã-Bretanha (Reino Unido, UK)",
              value: "GB",
            },
            {
              label: "Granada",
              value: "GD",
            },
            {
              label: "Grécia",
              value: "GR",
            },
            {
              label: "Groelândia",
              value: "GL",
            },
            {
              label: "Guadalupe",
              value: "GP",
            },
            {
              label: "Guam (Território dos Estados Unidos)",
              value: "GU",
            },
            {
              label: "Guatemala",
              value: "GT",
            },
            {
              label: "Guernsey",
              value: "GG",
            },
            {
              label: "Guiana",
              value: "GY",
            },
            {
              label: "Guiana Francesa",
              value: "GF",
            },
            {
              label: "Guiné",
              value: "GN",
            },
            {
              label: "Guiné Equatorial",
              value: "GQ",
            },
            {
              label: "Guiné-Bissau",
              value: "GW",
            },
            {
              label: "Haiti",
              value: "HT",
            },
            {
              label: "Holanda",
              value: "NL",
            },
            {
              label: "Honduras",
              value: "HN",
            },
            {
              label: "Hong Kong",
              value: "HK",
            },
            {
              label: "Hungria",
              value: "HU",
            },
            {
              label: "Iêmen",
              value: "YE",
            },
            {
              label: "Ilha Bouvet",
              value: "BV",
            },
            {
              label: "Ilha de Ascensão",
              value: "AC",
            },
            {
              label: "Ilha de Clipperton",
              value: "CP",
            },
            {
              label: "Ilha de Man",
              value: "IM",
            },
            {
              label: "Ilha Natal",
              value: "CX",
            },
            {
              label: "Ilha Pitcairn",
              value: "PN",
            },
            {
              label: "Ilha Reunião",
              value: "RE",
            },
            {
              label: "Ilhas Aland",
              value: "AX",
            },
            {
              label: "Ilhas Cayman",
              value: "KY",
            },
            {
              label: "Ilhas Cocos",
              value: "CC",
            },
            {
              label: "Ilhas Cook",
              value: "CK",
            },
            {
              label: "Ilhas Faroes",
              value: "FO",
            },
            {
              label: "Ilhas Geórgia do Sul e Sandwich do Sul",
              value: "GS",
            },
            {
              label: "Ilhas Heard e McDonald (Território da Austrália)",
              value: "HM",
            },
            {
              label: "Ilhas Malvinas",
              value: "FK",
            },
            {
              label: "Ilhas Marianas do Norte",
              value: "MP",
            },
            {
              label: "Ilhas Marshall",
              value: "MH",
            },
            {
              label: "Ilhas Menores dos Estados Unidos",
              value: "UM",
            },
            {
              label: "Ilhas Norfolk",
              value: "NF",
            },
            {
              label: "Ilhas Salomão",
              value: "SB",
            },
            {
              label: "Ilhas Seychelles",
              value: "SC",
            },
            {
              label: "Ilhas Tokelau",
              value: "TK",
            },
            {
              label: "Ilhas Turks e Caicos",
              value: "TC",
            },
            {
              label: "Ilhas Virgens (Estados Unidos)",
              value: "VI",
            },
            {
              label: "Ilhas Virgens (Inglaterra)",
              value: "VG",
            },
            {
              label: "Índia",
              value: "IN",
            },
            {
              label: "Indonésia",
              value: "ID",
            },
            {
              label: "Irã",
              value: "IR",
            },
            {
              label: "Iraque",
              value: "IQ",
            },
            {
              label: "Irlanda",
              value: "IE",
            },
            {
              label: "Islândia",
              value: "IS",
            },
            {
              label: "Israel",
              value: "IL",
            },
            {
              label: "Itália",
              value: "IT",
            },
            {
              label: "Jamaica",
              value: "JM",
            },
            {
              label: "Japão",
              value: "JP",
            },
            {
              label: "Jersey",
              value: "JE",
            },
            {
              label: "Jordânia",
              value: "JO",
            },
            {
              label: "Kiribati",
              value: "KI",
            },
            {
              label: "Kosovo",
              value: "XK",
            },
            {
              label: "Kuait",
              value: "KW",
            },
            {
              label: "Laos",
              value: "LA",
            },
            {
              label: "Lesoto",
              value: "LS",
            },
            {
              label: "Letônia",
              value: "LV",
            },
            {
              label: "Líbano",
              value: "LB",
            },
            {
              label: "Libéria",
              value: "LR",
            },
            {
              label: "Líbia",
              value: "LY",
            },
            {
              label: "Liechtenstein",
              value: "LI",
            },
            {
              label: "Lituânia",
              value: "LT",
            },
            {
              label: "Luxemburgo",
              value: "LU",
            },
            {
              label: "Macau",
              value: "MO",
            },
            {
              label: "Macedônia (República Yugoslava)",
              value: "MK",
            },
            {
              label: "Madagascar",
              value: "MG",
            },
            {
              label: "Malásia",
              value: "MY",
            },
            {
              label: "Malaui",
              value: "MW",
            },
            {
              label: "Maldivas",
              value: "MV",
            },
            {
              label: "Mali",
              value: "ML",
            },
            {
              label: "Malta",
              value: "MT",
            },
            {
              label: "Marrocos",
              value: "MA",
            },
            {
              label: "Martinica",
              value: "MQ",
            },
            {
              label: "Maurício",
              value: "MU",
            },
            {
              label: "Mauritânia",
              value: "MR",
            },
            {
              label: "Mayotte",
              value: "YT",
            },
            {
              label: "México",
              value: "MX",
            },
            {
              label: "Micronésia",
              value: "FM",
            },
            {
              label: "Moçambique",
              value: "MZ",
            },
            {
              label: "Moldova",
              value: "MD",
            },
            {
              label: "Mônaco",
              value: "MC",
            },
            {
              label: "Mongólia",
              value: "MN",
            },
            {
              label: "Montenegro",
              value: "ME",
            },
            {
              label: "Montserrat",
              value: "MS",
            },
            {
              label: "Myanma",
              value: "MM",
            },
            {
              label: "Namíbia",
              value: "NA",
            },
            {
              label: "Nauru",
              value: "NR",
            },
            {
              label: "Nepal",
              value: "NP",
            },
            {
              label: "Nicarágua",
              value: "NI",
            },
            {
              label: "Níger",
              value: "NE",
            },
            {
              label: "Nigéria",
              value: "NG",
            },
            {
              label: "Niue",
              value: "NU",
            },
            {
              label: "Noruega",
              value: "NO",
            },
            {
              label: "Nova Caledônia",
              value: "NC",
            },
            {
              label: "Nova Zelândia",
              value: "NZ",
            },
            {
              label: "Omã",
              value: "OM",
            },
            {
              label: "Países Baixos Caribenhos",
              value: "BQ",
            },
            {
              label: "Palau",
              value: "PW",
            },
            {
              label: "Palestina",
              value: "PS",
            },
            {
              label: "Panamá",
              value: "PA",
            },
            {
              label: "Papua-Nova Guiné",
              value: "PG",
            },
            {
              label: "Paquistão",
              value: "PK",
            },
            {
              label: "Paraguai",
              value: "PY",
            },
            {
              label: "Peru",
              value: "PE",
            },
            {
              label: "Polinésia Francesa",
              value: "PF",
            },
            {
              label: "Polônia",
              value: "PL",
            },
            {
              label: "Porto Rico",
              value: "PR",
            },
            {
              label: "Portugal",
              value: "PT",
            },
            {
              label: "Qatar",
              value: "QA",
            },
            {
              label: "Quênia",
              value: "KE",
            },
            {
              label: "Quirguistão",
              value: "KG",
            },
            {
              label: "República Centro-Africana",
              value: "CF",
            },
            {
              label: "República Democrática do Congo",
              value: "CD",
            },
            {
              label: "República Dominicana",
              value: "DO",
            },
            {
              label: "República Tcheca",
              value: "CZ",
            },
            {
              label: "Romênia",
              value: "RO",
            },
            {
              label: "Ruanda",
              value: "RW",
            },
            {
              label: "Rússia (antiga URSS) - Federação Russa",
              value: "RU",
            },
            {
              label: "Saara Ocidental",
              value: "EH",
            },
            {
              label: "Saint-Pierre e Miquelon",
              value: "PM",
            },
            {
              label: "Samoa Americana",
              value: "AS",
            },
            {
              label: "Samoa Ocidental",
              value: "WS",
            },
            {
              label: "San Marino",
              value: "SM",
            },
            {
              label: "Santa Helena",
              value: "SH",
            },
            {
              label: "Santa Lúcia",
              value: "LC",
            },
            {
              label: "São Bartolomeu",
              value: "BL",
            },
            {
              label: "São Cristóvão e Névis",
              value: "KN",
            },
            {
              label: "São Martim",
              value: "MF",
            },
            {
              label: "São Martinho",
              value: "SX",
            },
            {
              label: "São Tomé e Príncipe",
              value: "ST",
            },
            {
              label: "São Vicente e Granadinas",
              value: "VC",
            },
            {
              label: "Senegal",
              value: "SN",
            },
            {
              label: "Serra Leoa",
              value: "SL",
            },
            {
              label: "Sérvia",
              value: "RS",
            },
            {
              label: "Síria",
              value: "SY",
            },
            {
              label: "Somália",
              value: "SO",
            },
            {
              label: "Sri Lanka",
              value: "LK",
            },
            {
              label: "Suazilândia",
              value: "SZ",
            },
            {
              label: "Sudão",
              value: "SD",
            },
            {
              label: "Sudão do Sul",
              value: "SS",
            },
            {
              label: "Suécia",
              value: "SE",
            },
            {
              label: "Suíça",
              value: "CH",
            },
            {
              label: "Suriname",
              value: "SR",
            },
            {
              label: "Svalbard",
              value: "SJ",
            },
            {
              label: "Tadjiquistão",
              value: "TJ",
            },
            {
              label: "Tailândia",
              value: "TH",
            },
            {
              label: "Taiwan",
              value: "TW",
            },
            {
              label: "Tanzânia",
              value: "TZ",
            },
            {
              label: "Território Britânico do Oceano índico",
              value: "IO",
            },
            {
              label: "Territórios do Sul da França",
              value: "TF",
            },
            {
              label: "Timor-Leste",
              value: "TL",
            },
            {
              label: "Togo",
              value: "TG",
            },
            {
              label: "Tonga",
              value: "TO",
            },
            {
              label: "Trinidad e Tobago",
              value: "TT",
            },
            {
              label: "Tristão da Cunha",
              value: "TA",
            },
            {
              label: "Tunísia",
              value: "TN",
            },
            {
              label: "Turcomenistão",
              value: "TM",
            },
            {
              label: "Turquia",
              value: "TR",
            },
            {
              label: "Tuvalu",
              value: "TV",
            },
            {
              label: "Ucrânia",
              value: "UA",
            },
            {
              label: "Uganda",
              value: "UG",
            },
            {
              label: "Uruguai",
              value: "UY",
            },
            {
              label: "Uzbequistão",
              value: "UZ",
            },
            {
              label: "Vanuatu",
              value: "VU",
            },
            {
              label: "Vaticano",
              value: "VA",
            },
            {
              label: "Venezuela",
              value: "VE",
            },
            {
              label: "Vietnã",
              value: "VN",
            },
            {
              label: "Wallis e Futuna",
              value: "WF",
            },
            {
              label: "Zâmbia",
              value: "ZM",
            },
            {
              label: "Zimbábue",
              value: "ZW",
            },
          ],
        },
      },
    ],
  },
};
