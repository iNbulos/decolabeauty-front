import {
    CalendarDays,
    BadgeDollarSign,
    MessageSquareText,
    Users,
    BriefcaseBusiness,
    ShoppingCart,
    ReceiptText,
    UserRoundCog,
    Award,
    ChartColumn,
    Settings,
    LogOut,
    Home,
} from "lucide-react";

export const sidebarSections = [
    {
        type: "item",
        id: "agenda",
        label: "Agenda",
        icon: CalendarDays
    },
    {
        type: "item",
        id: "outstanding",
        label: "Cobranças",
        icon: BadgeDollarSign
    },
    {
        type: "group",
        label: "Itens",
        children: [
            {
                id: "mpd",
                label: "Msgs Pré-definidas",
                icon: MessageSquareText,
            },
            {
                id: "customers",
                label: "Clientes",
                icon: Users,
            },
            {
                id: "services",
                label: "Serviço",
                icon: BriefcaseBusiness,
            },
            {
                id: "products",
                label: "Produtos e Estoque",
                icon: ShoppingCart,
                visible: false,
            },
            {
                id: "expenses",
                label: "Despesas",
                icon: ReceiptText,
            },
            {
                id: "employees",
                label: "Funcionários",
                icon: UserRoundCog,
                visible: false,
            },
        ],
    },
    {
        type: "group",
        label: "Relatórios",
        children: [
            {
                id: "top_customers",
                label: "Melhores clientes",
                icon: Award,
            },
            {
                id: "overview",
                label: "Resumo financeiro",
                icon: ChartColumn,
            },
        ],
    },
    {
        type: "group",
        label: "Conta e funcionários",
        children: [
            {
                id: "settings",
                label: "Minha conta",
                icon: Settings,
            },
            {
                id: "logout",
                label: "Sair",
                icon: LogOut,
                danger: true,
            },
        ],
    },
    {
        type: "item",
        id: "home",
        label: "Página inicial",
        icon: Home,
    },
];

export const sidebarTranslate = {
    agenda: "Agenda",
    outstanding: "Cobranças",
    mpd: "Msgs Pré-definidas",
    customers: "Clientes",
    services: "Serviço",
    products: "Produtos e Estoque",
    expenses: "Despesas",
    employees: "Funcionários",
    top_customers: "Melhores clientes",
    overview: "Resumo financeiro",
    settings: "Minha conta",
    logout: "Sair",
    home: "Página inicial",
};
