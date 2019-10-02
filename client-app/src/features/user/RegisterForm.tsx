import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Form, Button, Header } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { RootStoreContext } from "../../app/stores/rootStore";
import { IUserFormValues } from "../../app/models/user";
import { FORM_ERROR } from "final-form";
import { combineValidators, isRequired } from "revalidate";
import ErrorMessage from "../../app/common/form/ErrorMessage";

const validate = combineValidators({
  userName: isRequired("userName"),
  displayName: isRequired("displayName"),
  email: isRequired("email"),
  password: isRequired("password")
});

const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as="h2"
            content="Регистрация в ЕРЛ"
            color="teal"
            textAlign="center"
          />
          <Field
            name="userName"
            component={TextInput}
            placeholder="Имя пользователя"
          ></Field>
          <Field
            name="displayName"
            component={TextInput}
            placeholder="Отображаемое имя"
          ></Field>
          <Field name="email" component={TextInput} placeholder="Email"></Field>
          <Field
            name="password"
            component={TextInput}
            placeholder="Пароль"
            type="password"
          ></Field>
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <Button
            //disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            loading={submitting}
            color="teal"
            content="Регистрация"
            fluid
          />
        </Form>
      )}
    />
  );
};

export default RegisterForm;
