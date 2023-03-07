// 用FlashList替换FlatList
import * as React from 'react';

import {
  Text,
  View,
  FlatList,
  Button,
  StatusBar,
  TextInput,
} from 'react-native';
import { Header } from '../components/header';

const { useState, useCallback, useRef } = React;

let id = 1;

const contactList = new Array(300000).fill(0).map((_, index) => ({
  mobileNo: index.toString(),
  id: id++,
  disabled: Math.random() > 0.5,
  checked: false,
}));

const findIndex = (id) => {
  return contactList.findIndex((item) => item.id === id);
};

let isSelectedAll = false;

let data = contactList;

export default function FixSlow() {
  const [, setRefresh] = useState(false);
  const listRef = useRef<FlatList>(null);
  const [text, setText] = useState('');

  const handlePress = useCallback((id) => {
    const index = findIndex(id);

    /* 禁止选择的直接返回 */
    if (data[index].disabled) {
      return;
    }

    data[index].checked = !data[index].checked;

    const selectedArr = data.filter((item) => item.checked);

    if (selectedArr.length === data.length) {
      isSelectedAll = true;
    } else {
      isSelectedAll = false;
    }

    setRefresh((cur) => !cur);
  }, []);

  const handleTop = useCallback((id) => {
    const index = findIndex(id);

    if (index > 0) {
      let item = data.splice(index, 1);
      data.unshift(item[0]);
    }

    listRef.current.scrollToIndex({ index: 0, animated: true });
    setRefresh((cur) => !cur);
  }, []);

  const handleDelete = useCallback((id) => {
    const index = findIndex(id);
    if (index > -1) {
      data.splice(index, 1);
    }
    setRefresh((cur) => !cur);
  }, []);

  const handleAdd = useCallback(() => {
    data.unshift({
      mobileNo: data.length + '',
      id: id++,
      disabled: false,
      checked: true,
    });
    listRef.current.scrollToIndex({ index: 0, animated: true });
    setRefresh((cur) => !cur);
  }, []);

  const handleChange = useCallback((id) => {
    const index = findIndex(id);
    data[index].mobileNo += 1;
    setRefresh((cur) => !cur);
  }, []);

  const selectAll = useCallback(() => {
    isSelectedAll = !isSelectedAll;
    data.forEach((item) => {
      item.checked = isSelectedAll;
    });
    setRefresh((cur) => !cur);
  }, []);

  const ITEM_HEIGHT = 80;

  const renderItem = useCallback(
    ({ item }) => (
      <Item
        checked={item.checked}
        onPress={handlePress}
        onTop={handleTop}
        onDel={handleDelete}
        onAdd={handleAdd}
        onChange={handleChange}
        mobileNo={item.mobileNo}
        disabled={item.disabled}
        id={item.id}
      />
    ),
    [handlePress, handleTop, handleDelete, handleChange, handleAdd]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  const getItemLayout = useCallback(
    (data, index) => ({
      length: ITEM_HEIGHT,
      offset: ITEM_HEIGHT * index,
      index,
    }),
    []
  );

  const handleBlur = useCallback(() => {
    if (!text.trim()) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      data = contactList;
    } else {
      data = contactList.filter((item) => item.mobileNo.includes(text));
    }
    try {
      listRef.current.scrollToIndex({ animated: true, index: 0 });
    } catch (error) {}
    setRefresh((cur) => !cur);
  }, [text]);

  return (
    <>
      <Header title="Fix Slow" />

      <View style={{ marginTop: 40, flex: 1 }}>
        <StatusBar animated={true} backgroundColor="#61dafb" />

        <Button title={isSelectedAll ? '清除' : '全选'} onPress={selectAll} />

        <TextInput
          style={{
            padding: 16,
          }}
          onChangeText={setText}
          onBlur={handleBlur}
          value={text}
          placeholder={'搜索'}
        />

        <FlatList
          initialNumToRender={3}
          getItemLayout={getItemLayout}
          windowSize={2}
          keyExtractor={keyExtractor}
          ref={listRef}
          data={data}
          ListEmptyComponent={<Text>No Data</Text>}
          renderItem={renderItem}
        />
      </View>
    </>
  );
}

//
const Item = React.memo((props: any) => {
  return (
    <ListItem>
      <ListItem.CheckBox
        checked={props.checked}
        disabled={props.disabled}
        onPress={() => props.onPress(props.id)}
      />

      <ListItem.Content>
        <ListItem.Title>{props.mobileNo}</ListItem.Title>

        <View>
          <ListItem.Title> title{id++}</ListItem.Title>
        </View>
      </ListItem.Content>

      <ListItem.Btn title="Top" onPress={() => props.onTop(props.id)} />

      <ListItem.Btn title="Del" onPress={() => props.onDel(props.id)} />

      <ListItem.Btn title="Add" onPress={() => props.onAdd()} />

      <ListItem.Btn title="Change" onPress={() => props.onChange(props.id)} />
    </ListItem>
  );
});

const ListItem = (props) => {
  return (
    <View
      {...props}
      style={{
        height: 80,
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center',
      }}
    />
  );
};

ListItem.Content = (props) => <View {...props} />;

ListItem.CheckBox = (props) => (
  <Button
    {...props}
    title={props.disabled ? 'disabled' : 'check'}
    color={props.checked ? 'green' : 'grey'}
  />
);

ListItem.Title = (props) => <Text>{props.children}</Text>;

//新增
ListItem.Btn = (props) => <Button {...props} />;
