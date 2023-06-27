  
  
  <Pressable
                style={styles.loginbutton}
                onPress={
                  () => {
                    navigation.navigate('Auth', { screen: 'SignUp' });
                  }
                  // async function logIn() {
                  // try {
                  //   await Facebook.initializeAsync({
                  //     appId: '519788585978110',
                  //   });
                  //   const {
                  //     type,
                  //     token,
                  //     expirationDate,
                  //     permissions,
                  //     declinedPermissions,
                  //   } = await Facebook.logInWithReadPermissionsAsync({
                  //     permissions: ['public_profile'],
                  //   });
                  //   if (type === 'success') {
                  //     // Get the user's name using Facebook's Graph API
                  //     const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
                  //     Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
                  //   } else {
                  //     // type === 'cancel'
                  //   }
                  // } catch ({ message }) {
                  //   alert(`Facebook Login Error: ${message}`);
                  // }
                  //}
                }>
                <Text style={styles.text}>Sign Up</Text>
              </Pressable>