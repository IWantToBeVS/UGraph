import streamlit as st
import matplotlib.pyplot as plt
import numpy as np
from io import BytesIO

def plot_functions(functions, x_min, x_max, x_spacing, y_min, y_max, y_spacing, x_label, y_label, title, show_grid, fig_width, fig_height):
    x = np.linspace(x_min, x_max, 400)

    fig, ax = plt.subplots(figsize=(fig_width, fig_height))

    for func in functions:
        try:
            # Replace '^' with '**' in the function expression
            func_modified = func.replace('^', '**')

            # Evaluate the modified function with numpy functions
            y = eval(func_modified, {'x': x, 'sin': np.sin, 'cos': np.cos, 'e': np.e, 'pi': np.pi})
            ax.plot(x, y, label=func)

        except Exception as e:
            st.warning(f"Invalid function: {func}. Error: {e}")

    ax.axvline(x=0, color='r', linestyle='--', linewidth=1.5, label='x = 0')

    ax.axhline(y=0, color='g', linestyle='--', linewidth=1.5, label='y = 0')
    ax.set_ylim(y_min, y_max)
    ax.set_xlabel(x_label)
    ax.set_ylabel(y_label)
    ax.set_title(title)
    ax.legend()

    x_ticks = np.arange(x_min, x_max + 1, x_spacing)  
    ax.set_xticks(x_ticks)

    y_ticks = np.arange(y_min, y_max + 1, y_spacing) 
    ax.set_yticks(y_ticks)
    
    if show_grid:
        ax.grid(True)
    else:
        ax.grid(False)
    
    return fig

def main():
    st.title('Graphing Calculator')

    # Sidebar inputs
    st.sidebar.header('Graph Settings')
    title = st.sidebar.text_input('Title', value='Graph of Functions')
    x_min = st.sidebar.number_input('X min', value=-10.0)
    x_max = st.sidebar.number_input('X max', value=10.0)
    x_spacing = st.sidebar.slider('X spacing', value=2)
    y_min = st.sidebar.number_input('Y min', value=-10.0)
    y_max = st.sidebar.number_input('Y max', value=10.0)
    y_spacing = st.sidebar.slider('Y spacing', value=2)
    x_label = st.sidebar.text_input('X-axis Label', value='x')
    y_label = st.sidebar.text_input('Y-axis Label', value='y')
    show_grid = st.sidebar.checkbox('Show Gridlines', value=False)

    # Text input for functions
    st.sidebar.header('Enter Functions')
    function_input = st.sidebar.text_area('Enter functions of the form f(x) (one per line)', height=150)
    fig_width = st.sidebar.slider('Set Figure Width', value=10)
    fig_height = st.sidebar.slider('Set Figure Height', value=6)

    # Split functions by lines
    functions = function_input.split('\n')
    functions = [func.strip() for func in functions if func.strip()]

    # Plot button
    # if st.sidebar.button('Plot Functions'):
    #     if functions:
    #         fig = plot_functions(functions, x_min, x_max, y_min, y_max, x_label, y_label, title, show_grid)
    #         st.pyplot(fig)
    #     else:
    #         st.warning('Please enter at least one function.')

    if functions:
        fig = plot_functions(functions, x_min, x_max, x_spacing, y_min, y_max, y_spacing, x_label, y_label, title, show_grid, fig_width, fig_height)
        st.pyplot(fig)

        download_button = st.download_button(
            label="Download Graph",
            data=fig_to_bytes(fig),
            file_name='graph.png',
            mime='image/png'
        )

    else:
        st.warning('Please enter at least one function.')

def fig_to_bytes(fig):
    # Convert a Matplotlib figure to bytes
    buffer = BytesIO()
    fig.savefig(buffer, format='png')
    buffer.seek(0)
    return buffer

if __name__ == '__main__':
    main()
