import "../styles/List.css";

const List = ({ date, todo }) => {
    return (
        <div className="todo-list">
            <input type="checkBox" />
            <div className="todo-text">{todo.content}</div>
            <div className="button-container">
                <button>수정</button>
                <button>삭제</button>
            </div>
        </div>
    );
};

export default List;
