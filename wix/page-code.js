import { saveRunRapScore } from "backend/runRapScores";

const HTML_COMPONENT_ID = "#rapGameFrame";
const SCORE_MESSAGE = "RUN_RAP_FESTIVAL_SCORE";
const SCORE_ACK_MESSAGE = "RUN_RAP_FESTIVAL_SCORE_ACK";

$w.onReady(() => {
  $w(HTML_COMPONENT_ID).onMessage(async (event) => {
    const message = event.data || {};
    if (message.type !== SCORE_MESSAGE) return;

    try {
      const saved = await saveRunRapScore(message.payload, message.submissionId);
      $w(HTML_COMPONENT_ID).postMessage({
        type: SCORE_ACK_MESSAGE,
        ok: true,
        submissionId: message.submissionId,
        itemId: saved._id
      });
    } catch (error) {
      console.error("Run Rap Festival score save failed", error);
      $w(HTML_COMPONENT_ID).postMessage({
        type: SCORE_ACK_MESSAGE,
        ok: false,
        submissionId: message.submissionId,
        error: error.message || String(error)
      });
    }
  });
});
