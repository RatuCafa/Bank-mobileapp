import { AppMenu } from "../types"

export const menuCard: AppMenu[] = [
    { title: "Account and Card", iconName: "wallet", iconColor : '#4B0082', navigator: "/"},
    { title: "Tranfers", iconName: "arrow-alt-circle-left", iconColor : '#FF1493', navigator: "/"},
    { title: "Withdraw", iconName: "address-card", iconColor : '#00BFFF', navigator: "/"},
    { title: "Mobile prepaid", iconName: "dollar-sign", iconColor : '#FFA500', navigator: "/"},
    { title: "Pay the all", iconName: "receipt", iconColor : '#20B2AA', navigator: "/"},
    { title: "Save online", iconName: "box", iconColor : '#4B0082', navigator: "/"},
    { title: "Credit card", iconName: "credit-card", iconColor : '#FF8C00', navigator: "/"},
    { title: "Transaction Report", iconName: "info-circle", iconColor : '#0000CD', navigator: "/"},
    { title: "Currency", iconName: "book-open", iconColor : '#DC143C', navigator: "./menu/dumpScreen"},
];