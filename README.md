import React, { useState, useEffect } from 'react';

// Wrap DataComponent with the withLoading HOC
const DataComponentWithLoading = withLoading(DataComponent);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  // Simulate data fetching
  useEffect(() => {
    setTimeout(() => {
      setData(['Item 1', 'Item 2', 'Item 3']);
      setIsLoading(false);
    }, 2000); // Simulating a 2-second loading time
  }, []);

  return (
    <div>
      {/* Render the component with loading behavior */}
      <DataComponentWithLoading isLoading={isLoading} data={data} />
    </div>
  );
}
///////////////////

// UserList.js
import React from "react";

// Define the UserList component
const UserList = ({ users }) => {
  return (
    <div className="user-list">
      <ul>
        {users.map((user) => (
          // Use the unique user.id as the key
          <li key={user.id} className="user-item">
            <UserItem user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
};

// Define a reusable UserItem component
const UserItem = ({ user }) => (
  <div>
    <h4>{user.name}</h4>
    <p>{user.email}</p>
  </div>
);

export default UserList;




import React, { useState, useCallback } from 'react';

const Child = React.memo(({ increment }) => {
  console.log('Child re-rendered');
  return <button onClick={increment}>Increment</button>;
});

const Parent = () => {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => setCount((prevCount) => prevCount + 1), []);

  return (
    <div>
      <p>Count: {count}</p>
      <Child increment={increment} />
    </div>
  );
};

export default Parent;




import React, { useState, useMemo } from 'react';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const products = [
    'Apple',
    'Banana',
    'Orange',
    'Mango',
    'Pineapple',
    'Watermelon',
    'Grapes',
    'Papaya',
    'Strawberry',
  ];

  const filteredProducts = useMemo(() => {
    console.log('Filtering products...');
    return products.filter((product) =>
      product.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]); // Recalculate only when searchTerm changes

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for a product"
      />
      <ul>
        {filteredProducts.map((product) => (
          <li key={product}>{product}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;



1). Container Component vs Presentation(Pure) Component
Container Components are responsible for handling logic, managing state, and interacting with APIs or stores, while Presentation (or Pure) Components focus purely on rendering UI based on the data passed to them via props. This separation helps in keeping your components clean and modular.

// src/components/UserList.js

import React from 'react';

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

export default UserList;

// src/containers/UserListContainer.js

import React, { useState, useEffect } from 'react';
import UserList from '../components/UserList'; // Import the presentation component

const UserListContainer = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    fetch('https://<<api-domain>>/users')
      .then(response => response.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  // Passing the data (users) to the presentation component
  return <UserList users={users} />;
};

export default UserListContainer;

2). Use Higher Order Component (HOC) to share logic across components without repeating code
import React from 'react';

// Higher-Order Component that shows a loading message while the component is loading
const withLoading = (WrappedComponent) => {
  return ({ loading, ...otherProps }) => {
    if (loading) {
      return <div>Loading...</div>;
    }
    return <WrappedComponent {...otherProps} />;
  };
};

export default withLoading;
Clean up resources to avoid memory leaks when the component unmounts
import React, { useState, useEffect } from 'react';

const TimeoutComponent = () => {
  const [message, setMessage] = useState('Waiting...');

  useEffect(() => {
    // Set a timeout to change the message after 3 seconds
    const timer = setTimeout(() => {
      setMessage('Successfully created a case!');
    }, 3000);

    // Cleanup function to clear the timeout if the component unmounts
    return () => {
      clearTimeout(timer);
      console.log('Cleanup: Timeout cleared');
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <div>{message}</div>;
};

export default TimeoutComponent;

3). Use custom hooks that encapsulate reusable logic
import { useState, useEffect } from 'react';

const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetch;

Using the useFetch Hook in a Component
import React from 'react';
import useFetch from './useFetch';

const UserList = () => {
  const { data, loading, error } = useFetch('https://<<api-domain>>/users');

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <ul>
      {data.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
};

export default UserList;

4). Avoid writing gigantic components which include many child components

const Dashboard = () => (
  <div>
   <div>
       Header Banner
   </div>
    <div>
       <div>User Profile</div>
       <div>Name: Soe Than</div>
    </div>
    <div>
        List of cases
    </div>
  </div>
);

// Clean example
const Dashboard = () => (
  <div>
    <Banner title="Header Banner" />
    <UserProfile user={user} />
    <CaseList />
  </div>
);

const Banner = title => {
  return (
    <div>
       {title}
     </div>
  );
};

const UserProfile = ({ name }) => {
  return (
    <div>
       <div>User Profile</div>
       <div>Name: {name}</div>
     </div>
  );
};

const CaseList =() => {
  return (
    <div>
       List of cases
     </div>
  );
};
 
5). Avoid Prop Drilling
Avoid prop drilling by using Context API or other state management libraries.
// Bad example (Prop Drilling)
const Child = ({ user }) => <div>{user.name}</div>;

const Parent = ({ user }) => <Child user={user} />;

const GrandParent = ({ user }) => <Parent user={user} />;

// Clean example (Context API)
const UserContext = React.createContext();

const Child = () => {
  const { user } = React.useContext(UserContext);
  return <div>{user.name}</div>;
};

const GrandParent = () => {
  const user = { name: 'John' };
  return (
    <UserContext.Provider value={{ user }}>
      <Child />
    </UserContext.Provider>
  );
};


6). Single Responsibility Principle (SRP)
Each component should do one thing (e.g. UserProfile component only displays User Profile data)

// Bad example (Multiple responsibilities)
const Dashboard = () => {
  const user = { name: 'John' };
  const data = fetchData();

  return (
    <div>
      <div>{user.name}</div>
      <div>{data}</div>
    </div>
  );
};

// Clean example (Separate responsibilities)
const UserProfile = ({ user }) => <div>{user.name}</div>;

const DataDisplay = ({ data }) => <div>{data}</div>;

const Dashboard = () => {
  const user = { name: 'John' };
  const data = fetchData();

  return (
    <div>
      <UserProfile user={user} />
      <DataDisplay data={data} />
    </div>
  );
};

7). Render Props
Flexibility in rendering

FormInput component handles form input logic using the render prop pattern, allowing custom form rendering.

import React, { useState } from 'react';

const FormInput = ({ render }) => {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      {/* Render prop to handle what to display */}
      {render({ value })}
    </div>
  );
};

export default FormInput;

// src/components/InputExample.js

import React from 'react';
import FormInput from './FormInput';

const InputExample = () => (
  <FormInput
    render={({ value }) => (
      <div>
        <h1>Your input: {value ? value : 'Please type something...'}</h1>
      </div>
    )}
  />
);

export default InputExample;

Dynamic Rendering: The InputExample component uses the render prop to define how to display the current input value.
Input Control: FormInput provides all the input logic, allowing the parent to focus only on rendering.

8). Error Boundaries
Use error boundaries to handle unexpected errors gracefully

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error('Error:', error, 'Info:', info);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => (
  <ErrorBoundary>
    <MyComponent />
  </ErrorBoundary>
);




9. Use Object Destructuring For Props
Instead of passing the props object, use object destructuring to pass the prop name. This discards the need to refer to the props object each time you need to use it.

Avoid This,


Use this instead,



10 . Import Order
group external or third-party imports separately from local imports.

Avoid this,


Unstructured Imports
Use this instead,



11. Avoid writing inline styles
code example
import React from 'react';

const InlineButton = () => {
  return (
    <button
      style={{
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px 20px',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
      }}
    >
      Click Me
    </button>
  );
};

export default InlineButton;

import React from 'react';
import { withStyles } from '@mui/styles';
import { Button } from '@mui/material';

const styles = {
  root: {
    backgroundColor: 'blue',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    '&:hover': {
      backgroundColor: 'darkblue',
    },
  },
};

const StyledButton = ({ classes }) => {
  return (
    <Button className={classes.root}>
      Click Me
    </Button>
  );
};

export default withStyles(styles)(StyledButton);

12. Use triple equal
the triple equal (===) is used for strict equality comparison, meaning it checks both the value and the type of the two operands.


// Using triple equal (strict equality)
const num = 5;
const str = '5';

console.log(num === str); // false (different types)
console.log(num === 5);   // true (same type and value)

****************************************************************************** End of Clean Code ******************************************************************************

https://www.freecodecamp.org/news/how-to-update-the-apollo-clients-cache-after-a-mutation-79a0df79b840/
getAllBooks author must have id field, otherwise it will throw error runtime.

https://www.apollographql.com/docs/react/api/apollo-client/#apolloclient-functions

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
