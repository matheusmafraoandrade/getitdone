const getMessagePosition = (author, userUid) => {
  if (author === userUid) {
    return "ml-auto bg-primary/60";
  } else {
    return "mr-auto  bg-foreground/20";
  }
};

export default getMessagePosition;
