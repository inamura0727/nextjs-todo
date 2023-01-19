import create from 'zustand'
import { EditedTask } from '../types'

// ZustandはReactの状態管理ライブラリの一つ
/*
1. 最初にすべてのコンポーネントからアクセスできる場所(store)を作成
2.create関数の中でcallback関数を利用して共有したい変数の初期値と関数を設定する
3. 関数を設定する場合はset関数を利用することで変数を更新することが可能
*/
type State = {
  editedTask: EditedTask
  updateEditedTask: (payload: EditedTask) => void
  resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
  editedTask: { id: 0, title: '', description: '' },
  updateEditedTask: (payload) =>
    set({
      editedTask: {
        id: payload.id,
        title: payload.title,
        description: payload.description,
      },
    }),
  resetEditedTask: () =>
    set({ editedTask: { id: 0, title: '', description: '' } }),
}))

export default useStore
