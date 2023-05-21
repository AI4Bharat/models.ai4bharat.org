// import {
//   FormControl,
//   FormLabel,
//   Textarea,
//   Text,
//   Box,
//   Button,
//   Input,
//   Switch,
//   Checkbox,
//   HStack,
//   Modal,
//   ModalHeader,
//   useDisclosure,
//   ModalBody,
//   ModalOverlay,
//   ModalContent,
//   VStack,
//   Divider,
//   Spacer,
//   CheckboxGroup,
//   ModalCloseButton,
//   useToast,
// } from "@chakra-ui/react";
import {AiFillStar} from "react-icons/ai" 
import { Box, Button, FormControl, FormLabel, Input, Switch, TextField , Stack, Checkbox, Snackbar, Alert, Modal} from "@mui/material";
import React, { useState } from "react";
// import { fetchFeedbackQuestions, submitFeedback } from "../../api/serviceAPI";


const Feedback = ({
  feedbackLanguage,
  pipelineInput,
  pipelineOutput,
}) => {
  const [feedback, setFeedback] = useState({
    feedbackLanguage: feedbackLanguage,
    pipelineFeedback: {
      commonFeedback: [
        {
          feedbackType: "rating",
          question: "How would you rate the overall quality of the output?",
          rating: 0,
        },
      ],
    },
    taskFeedback: [
      {
        taskType: "asr",
        commonFeedback: [
          {
            feedbackType: "rating",
            question: "How would you rate the overall quality of the output?",
            rating: 0,
          },
        ],
        granularFeedback: [
          {
            feedbackType: "ratingList",
            question: "How would you rate the overall quality of the output?",
            ratingList: [
              {
                parameterName: "parameter1",
                checkbox: false,
              },
              {
                parameterName: "parameter2",
                checkbox: false,
              },
            ],
          },
          {
            feedbackType: "thumbs",
            question: "How would you rate the overall quality of the output?",
            rating: 0,
          },
        ],
      },
    ],
  });
  const [errorOpen, setErrorOpen] = useState(false);

  const handleSnackbarClose = () => {
    setErrorOpen(false);
  };

  const [suggest, setSuggest] = useState(false);
  const [suggestedPipelineOutput, setSuggestedPipelineOutput] = useState(pipelineOutput);
  // const fetchQuestions = () => {
  //   const response = fetchFeedbackQuestions({
  //     feedbackLanguage: feedbackLanguage,
  //     supportedTasks: ["asr"],
  //   });
  //   //TODO: Write parsing function for state management
  //   setFeedback(response);
  // };

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
                  return { ...data, [feedbackType]: value };
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
                    return { ...data, [feedbackType]: value };
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
                    return { ...data, [feedbackType]: value };
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
          <Box mt="1%">
            <text>How would you rate the overall quality of the output?</text>
            {Array(5)
              .fill("")
              .map((_, i) => (
                <AiFillStar
                  key={i}
                  mt="1%"
                  color={i < value ? "orange.500" : "gray.300"}
                  boxSize={6}
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
        );
      case "comment":
        let comment = data.comment;
        return (
          <Box mt="1%">
            <text>How would you rate the overall quality of the output?</text>
            <TextField
              placeholder="Enter your comment here"
              value={comment}
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

        console.log(thumbs);
        return (
          <Box mt="1%">
            <text>How would you rate the overall quality of the output?</text>
            <Stack direction="row">
              <Button
                variant={thumbs === false ? "ghost" : "solid"}
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
                variant={thumbs === true ? "ghost" : "solid"}
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
      case "checkboxList":
        let checkboxList = data.checkboxList;
        return (
          <Box mt="1%">
            <text>Which parameters should be improved?</text>
            <Stack direction="row" >
                {checkboxList.map((data, i) => {
                  return (
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
                    >
                      {data.parameterName}
                    </Checkbox>
                  );
                })}
              </Stack>
          </Box>
        );
      case "thumbsList":
        let thumbsList = data.thumbsList;
        return (
          <Box mt="1%">
            <text>Which parameters should be improved?</text>
            <Stack direction="row" >
              {thumbsList.map((data, i) => {
                return (
                  <Button
                    key={i}
                    variant={data.thumbs === true ? "solid" : "ghost"}
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
      case "ratingList":
        let ratingList = data.ratingList;
        return (
          <Box mt="1%">
            <text>Which parameters should be improved?</text>
            <Stack alignItems={"flex-start"}>
              {ratingList.map((data, i) => {
                return (
                  <Stack direction={"row"} key={i}>
                    <text>{data.parameterName}</text>
                    <Box>
                      {Array(5)
                        .fill("") 
                        .map((_, k) => (
                          <AiFillStar
                            key={k}
                            mt="1%"
                            color={k < data.rating ? "orange.500" : "gray.300"}
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
      // await submitFeedback(feedbackRequest, serviceId);
    } catch {
      setErrorOpen(true);
    }
  };

  return (
    <>
      <FormControl>
        {feedback.pipelineFeedback.commonFeedback?.map((data, index) => {
          return (
            <Box key={index}>
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
      <FormControl>
        {feedback.taskFeedback.map((data, parentIndex) => {
          return (
            <Box key={parentIndex}>
              <text fontSize="md" fontWeight="bold">
                {data.taskType}
              </text>
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
                {data.granularFeedback?.map((data, index) => {
                  return (
                    <Box key={index}>
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
      {suggestedPipelineOutput.pipelineResponse.filter((data, index) => {
        if (
          data.taskType === "translation"||
          data.taskType === "transliteration" ||
          data.taskType === "asr"
        ) {
          return data;
        }
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
                    }
                  }
                )}
            </Box>
          </FormControl>
        </>
      )}
      <Button mt={"2rem"} type="submit" onClick={onSubmitFeedback}>
        Submit
      </Button>
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
      <Button
        width="50rem"
        variant="contained"
        onClick={handleOpen}
        fullWidth
        style={{
          background : '#f06b42',
          borderColor: '#f06b42',
          '&:hover': {
            backgroundColor: '#f06b42',
          },
        }}
      >
        Give us feedback!
      </Button>
      <Modal  
       open={open}
       onClose={handleClose}>
            <Feedback {...props} />
      </Modal>
    </>
  );
};

