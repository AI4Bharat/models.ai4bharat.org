import { AiFillStar } from "react-icons/ai";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  TextField,
  Stack,
  Checkbox,
  Snackbar,
  Alert,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { fetchFeedbackQuestions } from "../../api/feedbackAPI";
// import { fetchFeedbackQuestions, submitFeedback } from "../../api/serviceAPI";

const Feedback = ({
  feedbackLanguage,
  handleModalClose,
  pipelineInput,
  pipelineOutput,
  taskType,
}) => {
  const [feedback, setFeedback] = useState();
  const [errorOpen, setErrorOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleSnackbarClose = () => {
    setErrorOpen(false);
  };

  const [suggest, setSuggest] = useState(false);
  const [suggestedPipelineOutput, setSuggestedPipelineOutput] =
    useState(pipelineOutput);

  const getFeedbackTypeString = (feedbackType) => {
    if (feedbackType.includes("-") === false) {
      return feedbackType;
    }

    return (
      feedbackType.split("-")[0] +
      feedbackType.split("-")[1][0].toUpperCase() +
      feedbackType.split("-")[1].slice(1)
    );
  };

  const fetchQuestions = async () => {
    let response = await fetchFeedbackQuestions({
      feedbackLanguage: "en",
      supportedTasks: [taskType],
    });
    console.log(response);
    response.pipelineFeedback.commonFeedback = getFeedbackType(
      response.pipelineFeedback.commonFeedback
    );
    let temp = response.taskFeedback.map((data) => {
      return {
        ...data,
        commonFeedback: getFeedbackType(data.commonFeedback),
        granularFeedback: getFeedbackType(data.granularFeedback),
      };
    });
    response.taskFeedback = temp;
    setFeedback(response);
  };

  useEffect(() => {
    fetchQuestions();
    //eslint-disable-next-line
  }, []);

  const getFeedbackType = (feedbackList) => {
    let temp = feedbackList.map((data) => {
      if (data.supportedFeedbackTypes.includes("rating")) {
        return {
          ...data,
          feedbackType: "rating",
          rating: 0,
        };
      } else if (data.supportedFeedbackTypes.includes("thumbs")) {
        return {
          ...data,
          feedbackType: "thumbs",
          thumbs: false,
        };
      } else if (data.supportedFeedbackTypes.includes("comment")) {
        return {
          ...data,
          feedbackType: "comment",
          comment: "",
        };
      } else if (data.supportedFeedbackTypes.includes("checkbox-list")) {
        return {
          ...data,
          feedbackType: "checkbox-list",
          checkboxList: data.parameters.map((d) => {
            return {
              parameterName: d,
              isSelected: false,
            };
          }),
        };
      } else if (data.supportedFeedbackTypes.includes("thumbs-list")) {
        return {
          ...data,
          feedbackType: "thumbs-list",
          thumbsList: data.parameters.map((d) => {
            return {
              parameterName: d,
              thumbs: false,
            };
          }),
        };
      } else if (data.supportedFeedbackTypes.includes("rating-list")) {
        return {
          ...data,
          feedbackType: "rating-list",
          ratingList: data.parameters.map((d) => {
            return {
              parameterName: d,
              rating: 0,
            };
          }),
        };
      } else {
        return data;
      }
    });
    return temp;
  };

  const changeFeedbackState = (
    index,
    value,
    feedbackLocation,
    parentIndex = -1,
    feedbackType
  ) => {
    if (parentIndex === -1) {
      if (feedbackLocation)
        setFeedback({
          ...feedback,
          pipelineFeedback: {
            commonFeedback: feedback.pipelineFeedback.commonFeedback.map(
              (data, i) => {
                if (i === index) {
                  return {
                    ...data,
                    [getFeedbackTypeString(feedbackType)]: value,
                  };
                } else {
                  return data;
                }
              }
            ),
          },
        });
    } else {
      if (feedbackLocation === "granular") {
        setFeedback({
          ...feedback,
          taskFeedback: feedback.taskFeedback.map((data, i) => {
            if (i === parentIndex) {
              return {
                ...data,
                granularFeedback: data.granularFeedback.map((data, j) => {
                  if (j === index) {
                    return {
                      ...data,
                      [getFeedbackTypeString(feedbackType)]: value,
                    };
                  } else {
                    return data;
                  }
                }),
              };
            } else {
              return data;
            }
          }),
        });
      } else if (feedbackLocation === "common") {
        setFeedback({
          ...feedback,
          taskFeedback: feedback.taskFeedback.map((data, i) => {
            if (i === parentIndex) {
              return {
                ...data,
                commonFeedback: data.commonFeedback.map((data, j) => {
                  if (j === index) {
                    return {
                      ...data,
                      [getFeedbackTypeString(feedbackType)]: value,
                    };
                  } else {
                    return data;
                  }
                }),
              };
            } else {
              return data;
            }
          }),
        });
      }
    }
  };

  const renderFeedbackType = (
    feedbackType,
    index,
    feedbackLocation,
    parentIndex = -1,
    data
  ) => {
    switch (feedbackType) {
      case "rating":
        let value = data.rating;
        return (
          <Box
            mt="1%"
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <text style={{ fontSize: "1rem", marginBottom: "0.5%" }}>
              {" "}
              {data.question}
            </text>
            <Box>
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <AiFillStar
                    key={i}
                    mt="1%"
                    style={{
                      color: i < value ? "orange" : "gray",
                      fontSize: "1.5rem",
                    }}
                    boxSize={12}
                    onClick={() =>
                      changeFeedbackState(
                        index,
                        i + 1,
                        feedbackLocation,
                        parentIndex,
                        feedbackType
                      )
                    }
                  />
                ))}
            </Box>
          </Box>
        );
      case "comment":
        let comment = data.comment;
        return (
          <Box mt="1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <br />
            <TextField
              placeholder="Enter your comment here"
              value={comment}
              sx={{ width: "100%", marginBottom: "1%", marginTop: "1%" }}
              onChange={(e) =>
                changeFeedbackState(
                  index,
                  e.target.value,
                  feedbackLocation,
                  parentIndex,
                  feedbackType
                )
              }
            />
          </Box>
        );
      case "thumbs":
        let thumbs = data.thumbs;
        return (
          <Box mt="1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <Stack direction="row">
              <Button
                variant={thumbs === false ? "text" : "contained"}
                onClick={() => {
                  changeFeedbackState(
                    index,
                    true,
                    feedbackLocation,
                    parentIndex,
                    feedbackType
                  );
                }}
              >
                👍
              </Button>
              <Button
                variant={thumbs === true ? "text" : "contained"}
                onClick={() => {
                  changeFeedbackState(
                    index,
                    false,
                    feedbackLocation,
                    parentIndex,
                    feedbackType
                  );
                }}
              >
                👎
              </Button>
            </Stack>
          </Box>
        );
      case "checkbox-list":
        let checkboxList = data.checkboxList;
        return (
          <Box mt="1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <Stack direction="row">
              {checkboxList.map((data, i) => {
                return (
                  // {/* TODO: Add tags */}
                  <FormControlLabel
                    control={
                      <Checkbox
                        key={i}
                        isChecked={data.isSelected}
                        onChange={(e) =>
                          changeFeedbackState(
                            index,
                            [...checkboxList].map((checkboxData, j) => {
                              if (j === i) {
                                return {
                                  ...checkboxData,

                                  isSelected: e.target.checked,
                                };
                              } else {
                                return checkboxData;
                              }
                            }),
                            feedbackLocation,
                            parentIndex,
                            feedbackType
                          )
                        }
                      />
                    }
                    label={data.parameterName}
                  />
                );
              })}
            </Stack>
          </Box>
        );
      case "thumbs-list":
        let thumbsList = data.thumbsList;
        return (
          <Box mt="1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <Stack direction="row">
              {thumbsList.map((data, i) => {
                return (
                  <Button
                    key={i}
                    variant={data.thumbs === true ? "contained" : "text"}
                    onClick={() =>
                      changeFeedbackState(
                        index,
                        [...thumbsList].map((thumbsData, j) => {
                          if (j === i) {
                            return {
                              ...thumbsData,
                              thumbs: !thumbsData.thumbs,
                            };
                          } else {
                            return thumbsData;
                          }
                        }),
                        feedbackLocation,
                        parentIndex,
                        feedbackType
                      )
                    }
                  >
                    {data.parameterName}
                  </Button>
                );
              })}
            </Stack>
          </Box>
        );
      case "rating-list":
        let ratingList = data.ratingList;
        return (
          <Box mt="1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <Stack alignItems={"flex-start"}>
              {ratingList.map((data, i) => {
                return (
                  <Stack
                    justifyContent={"space-between"}
                    sx={{ width: "100%" }}
                    direction={"row"}
                    key={i}
                  >
                    <text>
                      {i + 1}.{data.parameterName}
                    </text>
                    <Box>
                      {Array(5)
                        .fill("")
                        .map((_, k) => (
                          <AiFillStar
                            key={k}
                            mt="1%"
                            style={{
                              color: k < data.rating ? "orange" : "gray",
                            }}
                            boxSize={6}
                            onClick={() =>
                              changeFeedbackState(
                                index,
                                [...ratingList].map((ratingData, j) => {
                                  if (j === i) {
                                    return {
                                      ...ratingData,
                                      rating: k + 1,
                                    };
                                  } else {
                                    return ratingData;
                                  }
                                }),
                                feedbackLocation,
                                parentIndex,
                                feedbackType
                              )
                            }
                          />
                        ))}
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
        );
      default:
        return <></>;
    }
  };

  const onSubmitFeedback = async () => {
    let feedbackRequest = {
      ...feedback,
      pipelineInput: pipelineInput,
      pipelineOutput: pipelineOutput,
      suggestedPipelineOutput: suggestedPipelineOutput,
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
      setOpen(true);
      handleModalClose();
    } catch {
      setErrorOpen(true);
    }
  };

  useEffect(() => {
    console.log(suggestedPipelineOutput);
  }, [suggestedPipelineOutput]);

  return (
    <>
      {feedback && (
        <>
          <FormControl sx={{ width: "100%" }}>
            {Array.isArray(taskType) &&
              feedback.pipelineFeedback.commonFeedback?.map((data, index) => {
                return (
                  <Box key={index} sx={{ width: "100%" }} mb="0.5%">
                    {renderFeedbackType(
                      data.feedbackType,
                      index,
                      "pipeline",
                      -1,
                      data
                    )}
                  </Box>
                );
              })}
          </FormControl>
          <br />

          <FormControl sx={{ width: "100%" }}>
            {feedback.taskFeedback.map((data, parentIndex) => {
              return (
                <Box key={data.taskType} mb="0.5%">
                  <Box>
                    {data.commonFeedback?.map((data, index) => {
                      return (
                        <Box key={index}>
                          {renderFeedbackType(
                            data.feedbackType,
                            index,
                            "common",
                            parentIndex,
                            data
                          )}
                        </Box>
                      );
                    })}
                  </Box>
                  <Box>
                    {data.granularFeedback
                      ?.slice(0, data.granularFeedback.length - 1)
                      .map((data, index) => {
                        return (
                          <Box key={index} mb="0.5%">
                            {renderFeedbackType(
                              data.feedbackType,
                              index,
                              "granular",
                              parentIndex,
                              data
                            )}
                          </Box>
                        );
                      })}
                  </Box>
                </Box>
              );
            })}
          </FormControl>
        </>
      )}

      {suggestedPipelineOutput.pipelineResponse.filter((data) => {
        if (
          data.taskType === "translation" ||
          data.taskType === "transliteration" ||
          data.taskType === "asr"
        ) {
          return data;
        }
        return null;
      }).length !== 0 && (
        <>
          <Box my="2%" />
          <FormControl>
            <FormLabel>
              <Stack direction="row">
                <text fontSize="lg" fontWeight="bold">
                  Do you want to suggest the pipeline output?
                </text>
                <Switch
                  onChange={() => setSuggest(!suggest)}
                  isChecked={suggest}
                />
              </Stack>
            </FormLabel>
            <Box>
              {suggest &&
                suggestedPipelineOutput?.pipelineResponse?.map(
                  (data, index) => {
                    if (
                      data.taskType === "translation" ||
                      data.taskType === "transliteration" ||
                      data.taskType === "asr"
                    ) {
                      return (
                        <Box key={index}>
                          <text fontSize="md" fontWeight="bold">
                            {data.taskType.toUpperCase()}
                          </text>
                          {data.output.map((output, i) => {
                            return (
                              <Box key={i}>
                                <Input
                                  fontSize="md"
                                  fontWeight="bold"
                                  value={
                                    output.target
                                      ? output.target
                                      : output.source
                                  }
                                  onChange={(e) => {
                                    let newSuggestedPipelineOutput = {
                                      ...suggestedPipelineOutput,
                                    };
                                    if (newSuggestedPipelineOutput) {
                                      // @ts-ignore
                                      newSuggestedPipelineOutput.pipelineResponse[
                                        index
                                      ].output[i].target = e.target.value;
                                      setSuggestedPipelineOutput(
                                        newSuggestedPipelineOutput
                                      );
                                    }
                                  }}
                                />
                              </Box>
                            );
                          })}
                        </Box>
                      );
                    } else {
                      return null;
                    }
                  }
                )}
            </Box>
          </FormControl>
        </>
      )}
      <Button
        style={{
          marginTop: "2rem",
          width: "100%",
          backgroundColor: "#f06b42",
          borderRadius: 15,
          padding: "15px 32px",
          ":hover": { backgroundColor: "#f06b42" },
          margin: 2.5,
        }}
        variant="contained"
        type="submit"
        onClick={onSubmitFeedback}
      >
        Submit
      </Button>
      <Snackbar autoHideDuration={5000} open={open} onClose={handleClose}>
        <Alert severity="success" sx={{ width: "100%" }} onClose={handleClose}>
          Feedback Submitted!
        </Alert>
      </Snackbar>
      <Snackbar
        open={errorOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="error">
          Error in submitting feedback
        </Alert>
      </Snackbar>
    </>
  );
};

export const FeedbackModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <br></br>
      {props.link ? (
        <Button
          onClick={handleOpen}
          variant={"text"}
          style={{
            float: "right",
            color: "#f06b42",
          }}
        >
          Have more to say? Give us a detailed feedback!
        </Button>
      ) : (
        <Button
          variant="contained"
          onClick={handleOpen}
          style={{
            background: "#f06b42",
            borderColor: "#f06b42",
            "&:hover": {
              backgroundColor: "#f06b42",
            },
          }}
        >
          Have more to say? Give us a detailed feedback!
        </Button>
      )}

      <Dialog open={open} onClose={handleClose} maxWidth="xl">
        <DialogTitle sx={{ fontSize: "1.8rem" }}>Feedback</DialogTitle>
        <DialogContent>
          <Feedback {...props} handleModalClose={handleClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};
