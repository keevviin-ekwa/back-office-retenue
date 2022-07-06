import { statusConfig } from "../config/constants";

const convertStatusToColor = (status) => {
  switch (status) {
    case statusConfig.STATUS_SENT.toString():
      return "rgb(178, 129, 220)";

    case statusConfig.STATUS_DRAFT.toString():
      return "rgb(254, 176, 235)";

    case statusConfig.STATUS_PARTIAL.toString():
      return "rgb(0, 182, 235)";

    case statusConfig.STATUS_PAID.toString():
      return "#56C382";

    case statusConfig.STATUS_CANCELLED.toString():
      return "#CD3C14";

    case statusConfig.STATUS_REVERSED.toString():
      return "#333";

    default:
      return "#949494";
  }
};

export default convertStatusToColor;
