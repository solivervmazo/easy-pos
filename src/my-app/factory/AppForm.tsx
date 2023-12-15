import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { ChipButton, SectionHeader, Spacer } from "../../ui";
import {
  appColors,
  appConstants,
  appFonts,
  appSizes,
  appSpacing,
} from "../../themes";
import { FormState } from "../../enums";
import { useDispatch } from "react-redux";
import { AnyAction } from "@reduxjs/toolkit";
import { Control, useForm } from "react-hook-form";
import { appStore } from "../store";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import { ScrollView } from "react-native-gesture-handler";
import { t } from "../../locale/localization";

// Props for sections within the form
type SectionProps = {
  title?: string;
  children?: React.ReactNode;
};

// Props for Gap within the form
type GapProps = {
  size: number;
};

// Props for input fields within the form
type FormForValidationProps = {
  control: Control;
  errors: { [key: string]: any };
};

// Props for individual input fields within the form
type FormInputProps = {
  inputName?: string;
} & FormForValidationProps;

type MyFormProps = {
  /**
   * Children components to be rendered within the form.
   */
  children?: React.ReactNode;

  /**
   * Current state of the form, including the form state and data.
   */
  state: {
    /**
     * The current state of the form (e.g., editing, confirming).
     */
    state: FormState;

    /**
     * The data associated with the form fields.
     */
    body: { [key: string]: any };
  };

  /**
   * Identifier used to search for details, typically obtained from route parameters.
   */
  detailId: string;

  /**
   * Path to redirect to after successfully saving the form; no redirection if not provided.
   */
  redirectPath: string;

  /**
   * Yup validation schema to validate form inputs.
   */
  validatorSchema: any;

  /**
   * Redux action to update the form state.
   */
  updateFormAction?({}: any): AnyAction;

  /**
   * Redux action to insert a new record into the system.
   */
  requestInsertAction?({}: any): AnyAction;

  /**
   * Redux action to update an existing record in the system.
   */
  requestUpdateAction?(args?: any): AnyAction;

  /**
   * Redux action to request details of an existing record.
   */
  requestDetailAction?(args?: any): AnyAction;

  /**
   * Custom error message to display when form validation fails.
   */
  validationErrorMessage?: string;

  /**
   * Custom error message to display when form submission encounters an error.
   */
  submitErrorMessage?: string;

  /**
   * Custom success message to display when the form is submitted successfully.
   */
  submitSuccessMessage?: string;
};

// Factory function for creating form components
export const createFormFactory = () => {
  // Helper function to check if a child is a form section
  const isSectionOrGap = (
    child: React.ReactNode
  ): child is React.ReactElement<SectionProps> => {
    const valid =
      React.isValidElement(child) &&
      (child.type === Section || child.type === Gap);
    !valid &&
      console.warn("React element found that is not a section of app form");
    return valid;
  };

  // Helper function to check if an object is an action
  const isAction = (action: any): action is AnyAction => {
    return action && typeof action === "function";
  };

  // Helper functions for form state checks
  const isFormEditing = (state: FormState): state is FormState => {
    return state === FormState.editing;
  };

  const isFormConfirming = (state: FormState): state is FormState => {
    return state === FormState.confirming;
  };

  const isFormSubmitted = (state: any): state is FormState => {
    return state === FormState.sumbmitted;
  };

  const isFormIdle = (state: any): state is FormState => {
    return state === FormState.idle;
  };

  // Helper function to check if a redirect path is valid
  const isRedirectValid = (path: any): path is string => {
    return path && typeof path === "string";
  };

  // Helper function to check if a detail ID is present
  const hasDetailId = (id: any): id is string => {
    return !(id === undefined || id === "undefined") && typeof id === "string";
  };

  // Helper function to check if a form body has data
  const isFormHasBody = (body: any): body is { [key: string]: any } => {
    return body && Object.keys(body).length > 0;
  };

  // Helper function to recursively inject props into form components
  const recursivelyInjectProps = (
    children: React.ReactNode,
    state: MyFormProps["state"],
    validator: FormForValidationProps,
    rest: { [key: string]: any }
  ): React.ReactNode => {
    return React.Children.map(children, (child) => {
      const { onChange } = rest;
      const { control, errors } = validator;
      if (React.isValidElement(child)) {
        let childProps: Record<string, unknown> & FormInputProps & any = {
          ...child.props,
        };

        if (childProps.inputName) {
          const inputName: string = childProps.inputName;
          if (state?.body?.hasOwnProperty(inputName)) {
            childProps = {
              ...childProps,
              value: state.body[inputName],
              onChange: (value: any) => onChange({ [inputName]: value }),
            };
            childProps = {
              ...childProps,
              labelContainerStyle: styles.inputLabelContainer,
            };
          }
        }

        if (childProps.validate) {
          const inputName: string = childProps.inputName;
          !control &&
            console.error(
              "React element needs validation but no react-hook-form form controller found"
            );
          !inputName &&
            console.warn(
              "React element needs validation but property input name is not set"
            );
          if (inputName) {
            childProps = {
              ...childProps,
              control,
              name: inputName,
              errors: errors[inputName],
            };
          }
        }

        if (childProps.children) {
          childProps.children = recursivelyInjectProps(
            childProps.children as React.ReactNode,
            state,
            validator,
            rest
          );
        }
        return React.cloneElement(child, { ...childProps });
      }

      return child;
    });
  };

  // Main Form Component
  const MyComponent: React.FC<MyFormProps> & {
    Section: React.FC<SectionProps>;
    Gap: React.FC<GapProps>;
  } = ({
    children,
    detailId,
    state,
    redirectPath,
    validatorSchema,
    updateFormAction,
    requestInsertAction,
    requestUpdateAction,
    requestDetailAction,
    validationErrorMessage,
    submitErrorMessage,
    submitSuccessMessage,
  }) => {
    const router = useRouter();

    const [isNew, setIsNew] = useState<boolean>(true);
    const dispatch = useDispatch();

    const {
      control,
      handleSubmit,
      formState: { errors },
      setValue,
    } = useForm({
      reValidateMode: "onChange",
      resolver: yupResolver(validatorSchema),
      defaultValues: state?.body,
    });

    const onSubmitHandle = () => {
      if (isFormEditing(state?.state)) {
        isAction(updateFormAction) &&
          dispatch(
            updateFormAction({
              state: FormState.confirming,
            })
          );
      } else if (isFormConfirming(state?.state)) {
        if (isNew) {
          isAction(requestInsertAction) &&
            dispatch(requestInsertAction(state.body));
        } else {
          isAction(requestUpdateAction) &&
            dispatch(requestUpdateAction(state.body));
        }
      }
    };

    const onFormChangeHandle = (args: { [key: string]: any }): void => {
      isAction(updateFormAction) &&
        dispatch(
          updateFormAction({
            body: { ...state.body, ...args },
          })
        );
    };

    const onErrorHandle = () => {
      dispatch(
        appStore.toast.actions.addQueueAction({
          message: validationErrorMessage ?? t("fields are required", "phrase"),
          options: {
            type: "danger",
          },
          offset: appConstants.TOAST_ON_STACK_OFFSET,
        })
      );
    };

    const navigateDoneEditingHandle = () => {
      isRedirectValid(redirectPath) &&
        router.push({
          pathname: redirectPath,
        });
      dispatch(
        appStore.toast.actions.addQueueAction({
          message: `${t("successfully", "phrase")} ${
            isNew ? t("saved new", "phrase") : t("updated", "phrase")
          } ${submitSuccessMessage ?? ""}.`,
          options: {
            type: "success",
          },
        })
      );
    };

    useEffect(() => {
      if (isFormSubmitted(state?.state)) {
        navigateDoneEditingHandle();
      } else {
        if (!state) {
          const searchId = hasDetailId(detailId) ? detailId : undefined;
          setIsNew(!searchId);
          isAction(requestDetailAction) &&
            dispatch(requestDetailAction({ id: searchId }));
        } else if (isFormIdle(state?.state)) {
          if (isFormHasBody(state?.body)) {
            Object.keys(state.body).forEach((attr) =>
              setValue(attr, state.body[attr], { shouldDirty: true })
            );
          }
        }
      }
    }, [state, dispatch]);

    const formSections = React.Children.map(children, (section) => {
      if (isSectionOrGap(section)) {
        return React.cloneElement(section, {
          ...section.props,
          children: React.Children.map(section.props.children, (child) =>
            recursivelyInjectProps(
              child,
              state,
              { control, errors },
              { onChange: onFormChangeHandle }
            )
          ),
        });
      }
      return null;
    });

    return (
      <View style={[styles.container]}>
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}
        >
          {formSections}
        </ScrollView>
        <View style={[styles.formFooterContainer]}>
          <ChipButton
            disabled={state?.state === FormState.idle}
            onPress={handleSubmit(onSubmitHandle, onErrorHandle)}
            containerStyle={styles.saveButtonContainer}
            labelStyle={styles.saveButtonLabel}
            label={
              state?.state === FormState.confirming
                ? t("tap again to confirm", "phrase")
                : isNew
                ? t("create", "phrase")
                : t("update", "phrase")
            }
          />
        </View>
      </View>
    );
  };

  /**
   * Section is a React functional component that represents a section within the form.
   *
   * @component
   * @param {SectionProps} props - Props for Section.
   * @param {string} [props.title] - The title of the form section.
   * @param {React.ReactNode} props.children - The children components within the section.
   * @returns {React.ReactElement} Returns a React component.
   *
   * @example
   * // Example usage of Section within MyComponent
   * <MyComponent>
   *   <MyComponent.Section title="Personal Information">
   *     {/* Input fields for personal information go here *\/}
   *   </MyComponent.Section>
   *   {/* Additional form sections and input fields go here *\/}
   * </MyComponent>
   */
  const Section: React.FC<SectionProps> = ({ title, children }) => {
    return (
      <View style={styles.sectionContainer}>
        <SectionHeader
          titleSize={appSizes.Text.medium}
          containerStyle={styles.sectionHeaderContainer}
          title={title}
          titleColor={appColors.themeColor}
        />
        <View style={[styles.sectionContent]}>{children}</View>
      </View>
    );
  };

  const Gap: React.FC<GapProps> = ({ size }) => {
    return <Spacer size={size} horizontal={false} />;
  };

  MyComponent.Section = Section;
  MyComponent.Gap = Gap;

  return MyComponent;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    paddingHorizontal: appSpacing.screenPaddingLeft,
    paddingVertical: 10,
  },
  sectionContainer: { flex: 1 },
  sectionHeaderContainer: {
    marginBottom: 10,
  },
  sectionContent: { flex: 1, justifyContent: "flex-start", gap: 20 },
  inputLabelContainer: {
    marginStart: 10,
  },
  inputLabel: {
    fontSize: appSizes.Text.slightlyRegular,
    fontFamily: appFonts.medium,
  },
  inputActionButtonContainer: {
    backgroundColor: appColors.lightPrimary,
  },
  formFooterContainer: {},
  saveButtonContainer: {
    flex: 0,
    backgroundColor: appColors.lightSuccess,
    paddingVertical: 15,
  },
  saveButtonLabel: {
    fontSize: appSizes.Text.regular,
  },
});
