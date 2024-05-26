type TStarProps = {
  isDisabled?: string | boolean;
  isActive?: string | boolean;
  isActiveHalf?: string | boolean;
  willBeActive?: string | boolean;
  fill?: string;
} & {
  [key: string]: string;
};

const Star = (props: TStarProps) => {
  const starProps: TStarProps = Object.assign({}, props);
  const nameMap: TStarProps = {
    isDisabled: "is-disabled",
    isActive: "is-active",
    isActiveHalf: "is-active-half",
    willBeActive: "will-be-active",
  };
  const className = Object.keys(nameMap)
    .filter((prop) => (delete starProps[prop], props[prop]))
    .map((prop) => nameMap[prop])
    .join(" ");
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill={"none"}
      xmlns="http://www.w3.org/2000/svg"
      className={`react-rater-star ${className}`}
      {...starProps}
    >
      <path
        d="M7.62772 4.50697C8.68326 2.61343 9.21103 1.66666 10.0001 1.66666C10.7891 1.66666 11.3169 2.61343 12.3724 4.50697L12.6455 4.99685C12.9455 5.53494 13.0955 5.80398 13.3293 5.9815C13.5631 6.15901 13.8544 6.22491 14.4368 6.3567L14.9671 6.47668C17.0169 6.94045 18.0417 7.17234 18.2856 7.95643C18.5294 8.74053 17.8307 9.55755 16.4333 11.1916L16.0718 11.6143C15.6747 12.0787 15.4762 12.3109 15.3869 12.5981C15.2975 12.8853 15.3276 13.1951 15.3876 13.8146L15.4423 14.3787C15.6535 16.5588 15.7591 17.6489 15.1208 18.1335C14.4824 18.6181 13.5229 18.1763 11.6037 17.2926L11.1072 17.064C10.5618 16.8129 10.2891 16.6874 10.0001 16.6874C9.71104 16.6874 9.43835 16.8129 8.89299 17.064L8.39648 17.2926C6.47731 18.1763 5.51773 18.6181 4.87937 18.1335C4.24102 17.6489 4.34665 16.5588 4.55791 14.3787L4.61257 13.8146C4.6726 13.1951 4.70262 12.8853 4.6133 12.5981C4.52398 12.3109 4.32544 12.0787 3.92835 11.6143L3.56683 11.1916C2.16946 9.55755 1.47077 8.74053 1.7146 7.95643C1.95843 7.17234 2.9833 6.94045 5.03303 6.47668L5.56332 6.3567C6.14579 6.22491 6.43703 6.15901 6.67087 5.9815C6.90471 5.80398 7.05469 5.53494 7.35464 4.99685L7.62772 4.50697Z"
        fill={!props.fill ? "#18B2FF" : props.fill}
      />
    </svg>
  );
};

export default Star;