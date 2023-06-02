import React, { useEffect, useState } from "react";
import { Alert, Button, FormControl, FormLabel, Snackbar } from "@mui/material";
import { Stack } from "@mui/system";
const QuickFeedback = ({ pipelineInput, pipelineOutput }) => {
  const initialFeedback = {
    pipelineFeedback: {
      commonFeedback: [
        {
          feedbackType: "thumbs",
          question: "Are you satisfied with the results?",
          thumbs: null,
        },
      ],
    },
  };
  const [feedback, setFeedback] = useState(initialFeedback);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const onSubmitFeedback = async () => {
    let feedbackRequest = {
      ...feedback,
      pipelineInput: pipelineInput,
      pipelineOutput: pipelineOutput,
      feedbackTimeStamp: Math.floor(Date.now() / 1000),
      feedbackLanguage: "en",
    };
    try {
      await fetch(`${process.env.REACT_APP_BACKEND_URL}/inference/feedback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(feedbackRequest),
      });
    } catch {
      //   setErrorOpen(true);
    }
  };
  useEffect(() => {
    if (
      buttonClicked &&
      feedback.pipelineFeedback.commonFeedback[0].thumbs !== null
    ) {
      onSubmitFeedback();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [feedback, buttonClicked]);

  useEffect(() => {
    setFeedback(initialFeedback);
    setButtonClicked(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pipelineInput, pipelineOutput]);

  return (
    <div>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ fontSize: "1.3rem", color: "black" }}>
          Are you satisified with the results? &nbsp;
        </FormLabel>
        <div>
          <Button
            variant={
              feedback.pipelineFeedback.commonFeedback[0].thumbs === true
                ? "contained"
                : "text"
            }
            onClick={() => {
              setFeedback({
                ...feedback,
                pipelineFeedback: {
                  ...feedback.pipelineFeedback,
                  commonFeedback: [
                    {
                      ...feedback.pipelineFeedback.commonFeedback[0],
                      thumbs: true,
                    },
                  ],
                },
              });
              setButtonClicked(true);
              setOpen(true);
            }}
            disabled={buttonClicked}
            sx={{
              mr: 2,
              background:
                feedback.pipelineFeedback.commonFeedback[0].thumbs === true &&
                "#f06b42",
              borderColor:
                feedback.pipelineFeedback.commonFeedback[0].thumbs === true &&
                "#f06b42",
              "&:hover": {
                backgroundColor:
                  feedback.pipelineFeedback.commonFeedback[0].thumbs === true &&
                  "#f06b42",
              },
              fontSize: "1.3rem",
            }}
          >
            👍
          </Button>
          <Button
            variant={
              feedback.pipelineFeedback.commonFeedback[0].thumbs === false
                ? "contained"
                : "text"
            }
            onClick={() => {
              setFeedback({
                ...feedback,
                pipelineFeedback: {
                  ...feedback.pipelineFeedback,
                  commonFeedback: [
                    {
                      ...feedback.pipelineFeedback.commonFeedback[0],
                      thumbs: false,
                    },
                  ],
                },
              });
              setButtonClicked(true);
              setOpen(true);
            }}
            disabled={buttonClicked}
            sx={{
              mr: 2,
              background:
                feedback.pipelineFeedback.commonFeedback[0].thumbs === false &&
                "#f06b42",
              borderColor:
                feedback.pipelineFeedback.commonFeedback[0].thumbs === false &&
                "#f06b42",
              "&:hover": {
                backgroundColor:
                  feedback.pipelineFeedback.commonFeedback[0].thumbs ===
                    false && "#f06b42",
              },
              fontSize: "1.3rem",
            }}
          >
            👎
          </Button>

          <Snackbar open={open} onClose={handleClose}>
            <Alert
              severity="success"
              sx={{ width: "100%" }}
              onClose={handleClose}
            >
              Feedback Submitted!
            </Alert>
          </Snackbar>
        </div>
      </FormControl>
    </div>
  );
};

export default QuickFeedback;
