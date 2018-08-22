export const signals: Array<AbortController> = [];
export const addSignalController = (controller: AbortController) => {
  signals.push(controller);
};
