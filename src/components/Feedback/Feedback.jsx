import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogContent,
  FormControl,
  FormControlLabel,
  FormLabel,
  Input,
  Snackbar,
  Stack,
  Switch,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AiFillStar } from "react-icons/ai";
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
  const [alertOpen, setalertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [alertSeverity, setAlertSeverity] = useState("error");
  const handleSnackbarClose = () => {
    setalertOpen(false);
    setTimeout(setalertMessage(""), 6000);
    setAlertSeverity("error");
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
            mt="-1%"
            mb="2.5%"
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
          <Box mb="2%" mt="-1%">
            <text style={{ fontSize: "1rem" }}> {data.question}</text>
            <Stack direction="row">
              {checkboxList.map((data, i) => {
                return (
                  // {/* TODO: Add tags */}
                  <FormControlLabel
                    control={
                      <ButtonGroup>
                        <Button
                          style={{
                            marginTop: "1rem",
                            marginBottom: "1rem",
                            backgroundColor: data.isSelected
                              ? "#f06b42"
                              : "transparent",
                            color: data.isSelected ? "#ffffff" : "#000000",
                            borderColor: data.isSelected
                              ? "#ffffff"
                              : "#000000",
                          }}
                          variant={data.isSelected ? "contained" : "outlined"}
                          onClick={(e) =>
                            changeFeedbackState(
                              index,
                              [...checkboxList].map((checkboxData, j) => {
                                if (j === i) {
                                  return {
                                    ...checkboxData,
                                    isSelected: !checkboxData.isSelected,
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
                        >
                          {data.parameterName}
                        </Button>
                      </ButtonGroup>
                    }
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

  const checkRatingMandatory = (taskFeedback) => {
    const requiredRatings = [];
    const commonFeedback = taskFeedback.commonFeedback;
    if (commonFeedback[0].rating === 0) {
      requiredRatings.push(commonFeedback[0].question);
    }

    return requiredRatings;
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

    const requiredRatings = checkRatingMandatory(feedback.taskFeedback[0]);
    if (requiredRatings.length !== 0) {
      setalertMessage(
        `Oops! Looks like you forgot to provide rating for the following question: ${requiredRatings[0]}. We value your feedback and would appreciate if you could kindly provide the missing ratings. Thank you for helping us improve your experience!`
      );
      setalertOpen(true);
    } else {
      try {
        await fetch(`${process.env.REACT_APP_BACKEND_URL}/inference/feedback`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(feedbackRequest),
        });
        handleModalClose();
      } catch {
        setalertMessage("Error in Submitting Feedback");
        setalertOpen(true);
      }
    }
  };

  return (
    feedback && (
      <>
        <h1 style={{ marginTop: "0rem" }}>Feedback</h1>
        {
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
        }
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
            <Box />
            <FormControl>
              <FormLabel>
                <Stack direction="row">
                  <text fontSize="lg" fontWeight="bold">
                    Do you want to suggest what the actual output should have
                    been?
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
                            <br /> <br />
                            {data.output.map((output, i) => {
                              return (
                                <Box key={i}>
                                  <TextField
                                    multiline
                                    style={{ width: "100%" }}
                                    rows={6}
                                    fontSize="md"
                                    fontWeight="bold"
                                    value={output.target}
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
        <br /> <br />
        <Button
          style={{
            marginTop: "2rem",
            width: "100%",
            backgroundColor: "#f06b42",
            borderRadius: 15,
            padding: "15px 15px",
            ":hover": { backgroundColor: "#f06b42" },
            margin: 2.5,
          }}
          variant="contained"
          type="submit"
          onClick={onSubmitFeedback}
        >
          Submit
        </Button>
        <Snackbar
          open={alertOpen}
          autoHideDuration={5000}
          onClose={handleSnackbarClose}
        >
          <Alert onClose={handleSnackbarClose} severity={alertSeverity}>
            {alertMessage}
          </Alert>
        </Snackbar>
      </>
    )
  );
};

export const FeedbackModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setIsLoading(true);
    setOpen(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setOpen(false);
  useEffect(() => {}, []);

  return (
    <>
      <br></br>
      {props.link ? (
        props.taskType !== "translation" ? (
          <Button
            onClick={handleOpen}
            variant={"text"}
            style={{
              float: "left",
              padding: "0px",
              color: "#f06b42",
            }}
          >
            Have more to say? Give us a detailed feedback!
          </Button>
        ) : (
          <Button
            onClick={handleOpen}
            variant={"text"}
            style={{
              padding: "0px",
              color: "#f06b42",
            }}
          >
            Have more to say? Give us a detailed feedback!
          </Button>
        )
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

      <Dialog
        open={open}
        sx={{ display: isLoading ? "none" : "block" }}
        onClose={handleClose}
        maxWidth="xl"
      >
        <DialogContent>
          {/* <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px' }}>
            <CircularProgress />
          </div> */}
          <Feedback
            {...props}
            setIsLoading={setIsLoading}
            handleModalClose={handleClose}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};
