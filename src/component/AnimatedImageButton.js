import React, { useRef, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Animated, TouchableNativeFeedback } from 'react-native';

// global
import { AnimationState as AS } from 'global/enum';

// hooks
import useStateWithCallback from 'hooks/useStateWithCallback';

function AnimatedImageButton(props) {
  const currentState = useRef(AS.initialRender);

  const [mount, setMount] = useStateWithCallback(null);
  const [animationStyle, setAnimationStyle] = useStateWithCallback({});

  const startAnimation = useCallback(
    ({ animType, onStart, onComplete }) => {
      const anim = props.animationStyle[animType];

      if (anim) {
        const animInit = {};
        const animEcex = {};
        const animStyle = {};
        const animFinish = {};

        for (let property in anim) {
          if (anim.hasOwnProperty(property)) {
            animInit[property] = new Animated.Value(anim[property][0]);

            animEcex[property] = Animated.timing(animInit[property], {
              toValue: anim[property][1],
              useNativeDriver: false,
              duration: props.timeout
            });

            animStyle[property] = animInit[property];

            animFinish[property] = false;
          }
        }

        setAnimationStyle(animStyle, animationStyle => {
          if (onStart && typeof onStart === 'function') {
            onStart();
          }

          for (let key in animEcex) {
            if (animEcex.hasOwnProperty(key)) {
              animEcex[key].start(({ finished }) => {
                animFinish[key] = true;
              });
            }
          }
        });

        if (onComplete && typeof onComplete === 'function') {
          const checkFinish = setInterval(() => {
            for (let key in animFinish) {
              if (animFinish.hasOwnProperty(key)) {
                if (animFinish[key] === false) {
                  return;
                }
              }
            }

            onComplete();
            clearInterval(checkFinish);
          }, 100);
        }
      }
    },
    [props.timeout, props.animationStyle]
  );

  useEffect(() => {
    if (currentState.current === AS.initialRender) {
      if (props.in === true) {
        setMount(true, () => {
          startAnimation({
            animType: 'appear',
            onStart: props.onAppear ? props.onAppear : undefined,
            onComplete: props.onAppeared ? props.onAppeared : undefined
          });

          currentState.current = AS.in;
        });
      } else if (props.in === false) {
        // No APPEAR animation

        setMount(false, () => {
          currentState.current = AS.out;
        });
      }
    } else {
      if (
        (props.in === true && currentState.current === AS.in) ||
        (props.in === false && currentState.current === AS.out)
      ) {
        // Don't execute ENTER/EXIT animation
        // No change in animation state
      }

      if (props.in === true && currentState.current === AS.out) {
        setMount(true, mount => {
          startAnimation({
            animType: 'enter',
            onStart: props.onEnter ? props.onEnter : undefined,
            onComplete: props.onEntered ? props.onEntered : undefined
          });

          currentState.current = AS.in;
        });
      } else if (props.in === false && currentState.current === AS.in) {
        startAnimation({
          animType: 'exit',
          onStart: props.onExit ? props.onExit : undefined,
          onComplete: () => {
            props.onExited && props.onExited();

            setMount(false, () => {
              currentState.current = AS.out;
            });
          }
        });
      }
    }
  }, [
    props.in,
    props.onAppear,
    props.onAppeared,
    props.onEnter,
    props.onEntered,
    props.onExit,
    props.onExited,
    startAnimation
  ]);

  if (mount) {
    return (
      <TouchableNativeFeedback onPress={props.onPress}>
        <Animated.Image
          source={props.image}
          style={[props.imageStyle, animationStyle]}
        />
      </TouchableNativeFeedback>
    );
  } else {
    return null;
  }
}

AnimatedImageButton.propTypes = {
  onExit: PropTypes.func,
  onEnter: PropTypes.func,
  onAppear: PropTypes.func,
  onExited: PropTypes.func,
  onEntered: PropTypes.func,
  onAppeared: PropTypes.func,
  in: PropTypes.bool.isRequired,
  image: PropTypes.any.isRequired,
  onPress: PropTypes.func.isRequired,
  timeout: PropTypes.number.isRequired,
  imageStyle: PropTypes.object.isRequired,
  animationStyle: PropTypes.object.isRequired
};

export default AnimatedImageButton;
