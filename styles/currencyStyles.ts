
import { StyleSheet } from "react-native";

export const COLORS = {
  background: "#F5E6D3",
  accent: "#8D6E63",
  dark: "#3E2723",
  white: "#FFFFFF",
  light: "#FFF9F2",
  danger: "#B3261E",
};

export const CurrencyStyle = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  content: {
    padding: 20,
    paddingBottom: 40,
  },

  // Header
  header: {
    marginTop: 35,
    marginBottom: 25,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.dark,
    letterSpacing: 0.5,
  },

  headerSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    marginTop: 8,
    lineHeight: 21,
  },

  // Form Card
  formCard: {
    backgroundColor: COLORS.light,
    borderRadius: 20,
    padding: 20,
    elevation: 4,
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,
  },

  label: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.dark,
    marginBottom: 10,
    marginTop: 15,
  },

  // Inputs
  amountInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 18,
    fontWeight: "600",
    color: COLORS.dark,
  },

  currencyInput: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.background,
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  targetInput: {
    flex: 1,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.background,
    borderRadius: 12,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 14,
    color: COLORS.dark,
  },

  // Add Button
  addButton: {
    backgroundColor: COLORS.accent,
    paddingHorizontal: 15,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  addButtonText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "bold",
  },

  // Currency Chips
  chipContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 18,
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.background,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 8,
  },

  chipText: {
    color: COLORS.dark,
    fontWeight: "bold",
    fontSize: 13,
  },

  chipRemove: {
    color: COLORS.accent,
    fontWeight: "bold",
    fontSize: 16,
  },

  // Submit Button
  submitButton: {
    backgroundColor: COLORS.dark,
    height: 52,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  disabledButton: {
    opacity: 0.6,
  },

  submitButtonText: {
    color: COLORS.white,
    fontWeight: "bold",
    fontSize: 15,
    letterSpacing: 0.3,
  },

  errorText: {
    color: COLORS.danger,
    fontSize: 13,
    marginTop: 15,
    textAlign: "center",
  },

  // Result Section
  sectionTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: COLORS.dark,
    marginTop: 30,
  },

  resultSubtitle: {
    fontSize: 14,
    color: COLORS.accent,
    marginTop: 5,
    marginBottom: 15,
  },

  listContainer: {
    gap: 12,
    marginTop: 10,
  },

  // Rate Card
  rateCard: {
    backgroundColor: COLORS.light,
    borderRadius: 16,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    elevation: 2,
    shadowColor: COLORS.dark,
    shadowOpacity: 0.08,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  currencyInfo: {
    flex: 1,
    marginRight: 8,
  },

  currencyCode: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.dark,
  },

  rateSubtext: {
    fontSize: 12,
    color: COLORS.accent,
    marginTop: 5,
  },

  convertedValue: {
    fontSize: 17,
    fontWeight: "bold",
    color: COLORS.dark,
    textAlign: "right",
  },

  emptyText: {
    textAlign: "center",
    color: COLORS.accent,
    fontSize: 14,
    marginTop: 25,
  },

  footer: {
    textAlign: "center",
    color: COLORS.accent,
    fontSize: 11,
    marginTop: 30,
    marginBottom: 10,
  },
});
