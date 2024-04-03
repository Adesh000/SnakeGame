import {
  Dimensions,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {Colors} from '../styles/styles';
import {Coordinate, Direction, GestureEventType} from '../types/types';
import Snake from './Snake';
import {checkGameOver, checkSnakeOverlap} from '../utils/checkGameOver';
import Food from './Food';
import {checkEatsFood} from '../utils/checkEatsFood';
import {randomFoodPosition} from '../utils/randomFoodPosition';
import Controls from './Controls';

const SNAKE_INITIAL_POSITION = [{x: 0, y: 5}];
const FOOD_INITIAL_POSITION = {x: 10, y: 20};
const GAME_BOUNDS = {xMin: 0, xMax: 31, yMin: 0, yMax: 58};
const MOVE_INTERVAL = 50;
const SCORE_INCREMENT = 10;
const {width, height} = Dimensions.get('window');

const Game = (): JSX.Element => {
  const [direction, setDirection] = useState<Direction>(Direction.Right);
  const [snake, setSnake] = useState<Coordinate[]>(SNAKE_INITIAL_POSITION);
  const [food, setFood] = useState<Coordinate>(FOOD_INITIAL_POSITION);
  const [isGameOver, setGameOver] = useState<boolean>(false);
  const [isPause, setPause] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  // const AnimatedSnake =
  useEffect(() => {
    if (!isGameOver) {
      const intervalId = setInterval(() => {
        !isPause && moveSnake();
      }, MOVE_INTERVAL);

      return () => clearInterval(intervalId);
    }
  }, [snake, isGameOver, isPause]);

  const restartGame = () => {
    setFood(FOOD_INITIAL_POSITION);
    setSnake(SNAKE_INITIAL_POSITION);
    setScore(0);
    setPause(false);
    setGameOver(false);
    setDirection(Direction.Right);
  };

  const moveSnake = () => {
    const snakeHead = snake[0];
    const newHead = {...snakeHead};

    if (
      checkGameOver(snakeHead, GAME_BOUNDS) ||
      checkSnakeOverlap(snakeHead, snake)
    ) {
      setGameOver(prev => !prev);
      return;
    }

    switch (direction) {
      case Direction.Up:
        newHead.y -= 1;
        break;
      case Direction.Down:
        newHead.y += 1;
        break;
      case Direction.Left:
        newHead.x -= 1;
        break;
      case Direction.Right:
        newHead.x += 1;
        break;
      default:
        break;
    }

    if (checkEatsFood(newHead, food, 2)) {
      setFood(randomFoodPosition(GAME_BOUNDS.xMax, GAME_BOUNDS.yMax));
      setSnake([newHead, ...snake]);
      setScore(prevScore => prevScore + SCORE_INCREMENT);
    } else {
      setSnake([newHead, ...snake.slice(0, -1)]);
    }
  };

  const handleGesture = (event: GestureEventType) => {
    console.log(event.nativeEvent);
    const {translationX, translationY} = event.nativeEvent;

    if (
      Math.abs(translationX) > Math.abs(translationY) &&
      (direction === Direction.Down || direction === Direction.Up)
    ) {
      if (translationX > 0) {
        // moving right
        setDirection(Direction.Right);
      } else {
        // moving left
        setDirection(Direction.Left);
      }
    } else if (
      Math.abs(translationY) > Math.abs(translationX) &&
      (direction === Direction.Left || direction === Direction.Right)
    ) {
      if (translationY > 0) {
        // moving down
        setDirection(Direction.Down);
      } else {
        // moving up
        setDirection(Direction.Up);
      }
    }
  };

  return (
    <PanGestureHandler onGestureEvent={handleGesture}>
      <SafeAreaView style={styles.container}>
        <View style={styles.controls}>
          <Controls moving={() => setPause(!isPause)} score={score} />
        </View>
        <View style={styles.boundaries}>
          <Snake snake={snake} />
          <Food food={food} />
        </View>
        <Modal animationType="fade" transparent={true} visible={isGameOver}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={{}}>Game Over!</Text>
              <TouchableOpacity
                style={styles.restartButtonStyle}
                onPress={restartGame}>
                <Text style={{color: '#fff'}}>Restart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </PanGestureHandler>
  );
};

export default Game;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
  },
  boundaries: {
    flex: 1,
    backgroundColor: Colors.background,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderWidth: 12,
    borderColor: Colors.primary,
  },
  controls: {
    backgroundColor: Colors.background,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    borderWidth: 12,
    borderBottomWidth: 0,
    borderColor: Colors.primary,
    padding: 10,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  restartButtonStyle: {
    backgroundColor: Colors.primary,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
});
