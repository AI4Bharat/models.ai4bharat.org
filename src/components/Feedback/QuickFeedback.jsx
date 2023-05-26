import React, { useEffect, useState } from "react";
import { Button, FormControl, FormLabel } from "@mui/material";
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
  }, [feedback, buttonClicked]);

  return (
    <div>
      <FormControl
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <FormLabel sx={{ fontSize: "1.3rem", color: "black" }}>
          Are you satisified with the results?
        </FormLabel>
        <div>
          <Button
            // variant={
            //   feedback.pipelineFeedback.commonFeedback[0].thumbs === true
            //     ? "contained"
            //     : "text"
            // }
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
            }}
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
            }}
            sx={{
              mr: 2,
              background:
                feedback.pipelineFeedback.commonFeedback[0].thumbs === false &&
                "#f06b42",
              borderColor: "#f06b42",
              "&:hover": {
                backgroundColor:
                  feedback.pipelineFeedback.commonFeedback[0].thumbs ===
                    false && "#f06b42",
              },
            }}
          >
            👎
          </Button>
        </div>
      </FormControl>
    </div>
  );
};

export default QuickFeedback;
